const {
  Basket,
  BasketProduct,
  Product,
  ProductInfo,
  ProductBrand,
  ProductType,
  Sizes,
} = require("../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class BasketController {
  async addProducts(req, res) {
    try {
      const { id, size_product } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketProduct.create({
        basketId: basket.id,
        productId: id,
        sizeId: size_product,
      });
      return res.json("Product added in card");
    } catch (e) {
      console.error(e);
    }
  }

  async getProducts(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = await Basket.findOne({ where: { userId: user.id } });
      const basket = await BasketProduct.findAll({ where: { basketId: id } });

      const basketArr = [];
      for (let i = 0; i < basket.length; i++) {
        let BasketProduct = await Product.findOne({
          where: {
            id: basket[i].productId,
          },
          include:
            {
              model: ProductInfo,
              as: "info",
              where: {
                productId: basket[i].productId,
                [Op.or]: [
                  {
                    productId: {
                      [Op.not]: null,
                    },
                  },
                ],
              },
              required: false,
            },
        });
        const size = {sizeId: basket[i].sizeId}
        const result = Object.assign(BasketProduct.dataValues, size)
        basketArr.push(result);
      }

      return res.json(basketArr);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      await Basket.findOne({ where: { userId: user.id } }).then(
        async (userBasket) => {
          if (userBasket.userId === user.id) {
            await BasketProduct.destroy({
              where: { basketId: userBasket.id, productId: id },
            });
          }
          return res.json(
            `You haven't access for delete the product(${id}) from basket that didn't belong to you`
          );
        }
      );
      return res.json("Product deleted form your card");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new BasketController();
