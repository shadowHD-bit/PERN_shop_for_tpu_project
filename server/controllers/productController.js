const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class ProductController{
    async createProduct(req, res, next) {
        try {
            let {name, price, productBrandId, productTypeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({name, price, productBrandId, productTypeId, imgMain: fileName});

            if(info){
                info = JSON.parse(info)
                info.forEach(i => 
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    
    }

    async getProduct(req, res) {
        let {productBrandId, productTypeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let product;
        if (!productBrandId && !productTypeId) {
            product = await Product.findAndCountAll({limit, offset})
        }
        if (productBrandId && !productTypeId) {
            product = await Product.findAndCountAll({where:{productBrandId}, limit, offset})
        }
        if (!productBrandId && productTypeId) {
            product = await Product.findAndCountAll({where:{productTypeId}, limit, offset})
        }
        if (productBrandId && productTypeId) {
            product = await Product.findAndCountAll({where:{productTypeId, productBrandId}, limit, offset})
        }
        return res.json(product)
    }

    async getOneProduct(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            }
        )
        return res.json(product)
    }

    async deleteProduct(req, res) {
        try {
            const {id} = req.params;
            await Product.findOne({where: {id}})
                .then( async data => {
                    if(data) {
                        await Product.destroy({where:{id}}).then(() => {
                            return res.json("Продукт удален");
                        })
                    } else {
                        return res.json("Этого продукта нет в базе данных...");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new ProductController()