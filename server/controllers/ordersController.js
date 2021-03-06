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

            if(isProductInDB.count === parseProducts.length) { 
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
            } else { 
                const notFoundIdProducts = [];
                const arrProducts = []; //found id
                isProductInDB.rows.forEach(item => arrProducts.push(item.id));
                parseProducts.forEach(productId => {
                    if(!arrProducts.includes(productId)) {
                        notFoundIdProducts.push(productId);
                    }
                });
                return ApiError.badRequest(res.json(`Some productes of id(${notFoundIdProducts.join(', ')}) not exist in DB`));
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
            const {id} = req.params;
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

        return res.json(products);
    }

    async getAllUser(req, res) {
        let {userId, limit, page, complete} = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let products;
        if(complete === "not-completed") {
            products = await Orders.findAndCountAll({where:{complete: false, userId: userId}, limit, offset});
        } else if(complete === "completed") {
            products = await Orders.findAndCountAll({where:{complete: true, userId: userId}, limit, offset});
        } else {
            products = await Orders.findAndCountAll({where:{userId: userId},limit, offset});
        }

        return res.json(products);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const order = {};
        try {
            let prod;
            let infoProductes = [];
            await Orders.findOne({where:{id}}).then(async data => {
                order.descr = data;
                prod = await OrderProduct.findAll({
                    attributes: ["productId", "count"],
                    where:{orderId: data.id},
                });

                for (let product of prod) {
                    await Product.findOne({
                        attributes: ["id", "name", "imgMain", "price"],
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
                        infoProductes.push(newObj);
                    });
                }
                order.prod = infoProductes;

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