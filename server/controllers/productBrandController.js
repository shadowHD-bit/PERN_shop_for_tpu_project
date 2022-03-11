const {ProductBrand} = require('../models/models')
const ApiError = require('../errors/ApiErrors');

class productBrandController {
    async createProductBrand(req, res) {
        const {name} = req.body
        const brand = await ProductBrand.create({name})
        return res.json(brand)
    }

    async getProductBrand(req, res) {
        const brands = await ProductBrand.findAll()
        return res.json(brands)
    }

}

module.exports = new productBrandController()