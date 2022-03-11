const {ProductType} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class ProductTypeController{
    async createProductType(req, res) {
        const {name} = req.body
        const type = await ProductType.create({name})
        return res.json(type)
    }

    async getProductType(req, res) {
        const types = await ProductType.findAll()
        return res.json(types)
    }

}

module.exports = new ProductTypeController()