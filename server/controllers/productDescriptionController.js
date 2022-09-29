const {DescriptionProduct} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class ProductDescriptionController{
    async createDescription(req, res, next) {
        try {
            let {product_id, description} = req.body
            const description_product = await DescriptionProduct.create({product_id, description});

            return res.json(description_product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    
    }

    async getDescription(req, res) {
        let description;
        description = await DescriptionProduct.findAll()
        return res.json(description)
    }

    async getOneDescription(req, res) {
        const {productId} = req.params
        const description = await DescriptionProduct.findOne(
            {
                where: {productId},
            }
        )
        return res.json(description)
    }

    async deleteDescription(req, res) {
        try {
            const {productId} = req.params;
            await DescriptionProduct.findOne({where: {productId}})
                .then( async data => {
                    if(data) {
                        await DescriptionProduct.destroy({where:{productId}}).then(() => {
                            return res.json("Описание удалено");
                        })
                    } else {
                        return res.json("Этого описания нет в базе данных...");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }


    async updateDescription(req, res) {
        try {
            const { description, productId } = req.body;

            await DescriptionProduct.findOne({where:{productId}})
                .then( async data => {
                    if(data) {
                        await DescriptionProduct.update({description}, {where:{productId}} ).then(() => {
                            return res.json("Описание обновлено");
                        })
                    } else {
                        return res.json("Этого описания нет в базе данных...");
                    }
                })
        } catch (e) {
            return res.json("Описание не обновленно из-за ошибки: " + e);
        }

    }

}

module.exports = new ProductDescriptionController()