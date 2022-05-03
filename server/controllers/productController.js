const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo, ProductBrand, ProductType} = require('../models/models')
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
            product = await Product.findAndCountAll({limit, include: [
                {model: ProductBrand},
                {model: ProductType},
            ], offset})
        }
        if (productBrandId && !productTypeId) {
            product = await Product.findAndCountAll({where:{productBrandId}, include: [
                {model: ProductBrand},
                {model: ProductType},
            ], limit, offset})
        }
        if (!productBrandId && productTypeId) {
            product = await Product.findAndCountAll({where:{productTypeId}, include: [
                {model: ProductBrand},
                {model: ProductType},
            ], limit, offset})
        }
        if (productBrandId && productTypeId) {
            product = await Product.findAndCountAll({where:{productTypeId, productBrandId}, include: [
                {model: ProductBrand},
                {model: ProductType},
            ], limit, offset})
        }
        return res.json(product)
    }

    async getOneProduct(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [
                    {model: ProductInfo, as: 'info'},
                    {model: ProductBrand},
                    {model: ProductType}
                ]
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


    async update(req, res) {
        try {
            const {id} = req.params;
            const {productBrandId, productTypeId, name, price, info} = req.body;

            await Product.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        productBrandId ? newVal.productBrandId = productBrandId : false;
                        productTypeId ? newVal.productTypeId = productTypeId : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if(req.files) {
                            const {imgMain} = req.files;
                            const type = imgMain.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            imgMain.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.imgMain = fileName;
                        }

                        if(info) {
                            const parseInfo = JSON.parse(info);
                            for (const item of parseInfo) {
                                await ProductInfo.findOne({where:{id: item.id}}).then( async data => {
                                    if(data) {
                                        await ProductInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, {where:{id: item.id}})
                                    } else {
                                        await ProductInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            productId: id
                                        })
                                    }
                                })
                            }
                        }

                        await Product.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Продукт обновлен");
                        })
                    } else {
                        return res.json("Этого продукта нет в базе данных!");
                    }
                })
            } catch (e) {
            return res.json(e);
        }
    }


    


    

}

module.exports = new ProductController()