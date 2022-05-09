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

    async deleteProductBrand(req, res) {
        try {
            const {id} = req.params;

            await ProductBrand.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await ProductBrand.destroy({where:{id}}).then(() => {
                            return res.json("Brand deleted");
                        })
                    } else {
                        return res.json("This Brand doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new productBrandController()