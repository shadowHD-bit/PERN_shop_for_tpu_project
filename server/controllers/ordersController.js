const {Orders, OrderProduct, Product, ProductBrand, ProductType} = require('./../models/models');
const ApiError = require('../errors/ApiErrors');
const jwt = require('jsonwebtoken');

class OrdersController {
    async create(req, res) {
        const auth = req.headers.authorization || "";
        const {basket} = req.body;

        try {
            let parseProducts = [];
            for (let key of basket) {
                parseProducts.push(key.id)
            }

            const isProductInDB = await Product.findAndCountAll({
                where: {id: parseProducts},
                attributes: ["id"]
            });

            if(isProductInDB.count === parseProducts.length) { //if all devices was found in DB
                const row = {};
                if(auth) {
                    const token = auth.split(' ')[1];
                    const {id} = jwt.verify(token, process.env.SECRET_KEY);
                    row.userId = id;
                }

                await Orders.create(row).then(order => {
                    const {id} = order.get();
                    parseProducts.forEach( async (productId, i) =>  {

                        await OrderProduct.create({
                            orderId: id,
                            productId,
                            count: basket[i].count
                        });
                    });
                });
            } else { //send msg about devices that didnt found in DB
                const notFoundIdProducts = [];
                const arrProducts = []; //found id
                isProductInDB.rows.forEach(item => arrProducts.push(item.id));
                parseProducts.forEach(productId => {
                    if(!arrProducts.includes(productId)) {
                        notFoundIdProducts.push(productId);
                    }
                });
                return ApiError.badRequest(res.json(`Some Devices of id(${notFoundIdProducts.join(', ')}) not exist in DB`));
            }

            return res.json("Thank you for you order! We will contact you shortly");
        } catch (e) {
            return res.json(e);
        }
    }

    async updateOrder(req, res) {
        try {
            const { complete, id } = req.body;

            await Orders.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Orders.update({complete}, {where:{id}} ).then(() => {
                            return res.json("Order updated");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Updated didn't complete because was error: " + e);
        }

    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.body;

            await Orders.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Orders.destroy({where:{id}}).then(() => {
                            return res.json("Order deleted");
                        })
                    } else {
                        return res.json("This order doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }

    async getAll(req, res) {
        let {limit, page, complete} = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let products;
        if(complete === "not-completed") {
            products = await Orders.findAndCountAll({where:{complete: false}, limit, offset});
        } else if(complete === "completed") {
            products = await Orders.findAndCountAll({where:{complete: true}, limit, offset});
        } else {
            products = await Orders.findAndCountAll({limit, offset});
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = {};
        try {
            let products;
            let infoProduct = [];
            await Orders.findOne({where:{id}}).then(async data => {
                order.descr = data;
                products = await OrderDevice.findAll({
                    attributes: ["productId", "count"],
                    where:{productId: data.id},
                });

                for (let product of products) {
                    await Product.findOne({
                        attributes: ["name", "imgMain", "price"],
                        where: {id: product.productId},
                        include: [
                            {
                                attributes: ["name"],
                                model: ProductType
                            },
                            {
                                attributes: ["name"],
                                model: ProductBrand
                            },
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: product.count
                        }
                        infoProduct.push(newObj);
                    });
                }
                order.products = infoProduct;

                return res.json(order);
            }).catch(() => {
                return res.json("Order doesn't exist in data base");
            });

        } catch (e) {
            return res.json("Delete didn't complete because was error: " + e);
        }
    }
}

module.exports = new OrdersController();