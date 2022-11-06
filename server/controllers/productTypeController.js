const {ProductType} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class ProductTypeController{
    async createProductType(req, res) {
        const {name} = req.body
        const type = await ProductType.create({name})
        return res.json(type)
    }

    async getProductType(req, res) {
        const types = await ProductType.findAndCountAll()
        return res.json(types)
    }

    async updateType(req, res) {
        try {
          const { id } = req.params;
          const { name } = req.body;
    
          await ProductType.findOne({ where: { id: id } }).then(async (data) => {
            if (data) {
              await ProductType.update({ name: name }, {where:{id: id}}).then(() => {
                return res.json("Type updated");
              });
            } else {
              return res.json("This Type doesn't exist in DB");
            }
          });
        } catch (e) {
          return res.json("Updated didn't complete because was error: " + e);
        }
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