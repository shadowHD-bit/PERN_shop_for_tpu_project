const {ProductType} = require('../models/models')
const ApiError = require('../errors/ApiErrors')
const uuid = require('uuid');
const path = require('path');

class ProductTypeController{
    async createProductType(req, res) {
        const {name} = req.body

        const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static_brand_and_type', fileName))

        const type = await ProductType.create({name, img: fileName})
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
    
          const {img} = req.files
          let fileName = uuid.v4() + ".jpg"
          img.mv(path.resolve(__dirname, '..', 'static_brand_and_type', fileName))

          await ProductType.findOne({ where: { id: id } }).then(async (data) => {
            if (data) {
              await ProductType.update({ name: name, img: fileName }, {where:{id: id}}).then(() => {
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