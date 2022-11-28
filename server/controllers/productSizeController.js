const uuid = require("uuid");
const path = require("path");
const { Slider, Sizes, ProductSizes } = require("../models/models");
const ApiError = require("../errors/ApiErrors");

class productSizeController {
  async createSize(req, res, next) {
    try {
      let { productId, sizeId } = req.body;
      const size = await ProductSizes.create({
        productId: productId,
        sizeId: sizeId,
      });

      return res.json(size);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteSize(req, res) {
    try {
        let { productId, sizeId } = req.body;
        await ProductSizes.findOne({ where: { productId: productId, sizeId:sizeId } }).then(async (data) => {
        if (data) {
          await ProductSizes.destroy({ where: { productId: productId, sizeId:sizeId }}).then(() => {
            return res.json("Размер удален");
          });
        } else {
          return res.json("Этого Размера нет в базе данных...");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new productSizeController();
