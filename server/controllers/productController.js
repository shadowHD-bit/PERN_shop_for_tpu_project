const uuid = require('uuid');
const path = require('path');
const {Product} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class ProductController{
    async createProduct(req, res, next) {
        try {
            let {name, price, productBrandId, productTypeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, productBrandId, productTypeId, imgMain: fileName});

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    
    }

    async getProduct(req, res) {
        
    }

    async getOneProduct(req, res) {
        
    }

}

module.exports = new ProductController()