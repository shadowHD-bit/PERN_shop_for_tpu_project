const uuid = require("uuid");
const path = require("path");
const { Slider, Sizes, ProductSizes } = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class SizeController {
  async createSize(req, res, next) {
    try {
      let { number_size } = req.body;
      const size = await Sizes.create({ number_size });

      return res.json(size);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getSizes(req, res) {
    let sizes = await Sizes.findAndCountAll();
    return res.json(sizes);
  }

  async getSizeOneProduct(req, res) {
    const { id } = req.params;
    const sizes = await ProductSizes.findAll({
      where: { productId: id },
      include: [
        {
          model: Sizes,
          where: { id: { [Op.col]: "product_sizes.sizeId" } },
          required: false,
          as: "size",
        },
      ],
    });
    return res.json(sizes);
  }

  async deleteSize(req, res) {
    try {
      const { id } = req.params;
 
      await ProductSizes.destroy({ where: { sizeId: id } }).then(
        async (data_prod) => {
          await Sizes.destroy({ where: { id } }).then(() => {
            return res.json("Размер удален");
          });
        }
      );
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new SizeController();
