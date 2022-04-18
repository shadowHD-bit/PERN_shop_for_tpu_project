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

    async deleteProductType(req, res) {
        try {
            const {id} = req.params;
            await ProductType.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await ProductType.destroy({where:{id}}).then(() => {
                            return res.json("Тип удален");
                        })
                    } else {
                        return res.json("Это тип отсутствует в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new ProductTypeController()