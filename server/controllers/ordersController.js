const {
  Orders,
  OrderProduct,
  Product,
  ProductBrand,
  ProductType,
  Notification,
  Sizes,
} = require("./../models/models");
const ApiError = require("../errors/ApiErrors");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

class OrdersController {
  async create(req, res) {
    const auth = req.headers.authorization || "";
    const { basket } = req.body;

    try {
      let parseProducts = [];
      let parseProductsData = [];
      for (let key of basket) {
        parseProducts.push(key.id);
        parseProductsData.push({
          productId: key.id,
          sizeId: key.sizeId,
          price: key.price,
        });
      }

      const isProductInDB = await Product.findAndCountAll({
        where: { id: parseProducts },
        attributes: ["id"],
      });

      if (isProductInDB.count === parseProducts.length) {
        const row = {};
        if (auth) {
          const token = auth.split(" ")[1];
          const { id } = jwt.verify(token, process.env.SECRET_KEY);
          row.userId = id;
        }

        await Orders.create(row).then((order) => {
          const { id } = order.get();
          parseProductsData.forEach(async (product, i) => {
            await Sizes.findOne({ where: { id: product.sizeId } }).then(
              async (data) => {
                await OrderProduct.create({
                  orderId: id,
                  productId: product.productId,
                  count: basket[i].count,
                  price: product.price,
                  size_product: data.dataValues.number_size,
                }).then(async (data) => {
                  const notification = await Notification.create({
                    notification_message: `Ваш заказ №${id} успешно оформлен! Мы уведомим вас, когда товар приедет к вам.`,
                    userId: row.userId,
                  });
                });
              }
            );
          });
        });
      } else {
        const notFoundIdProducts = [];
        const arrProducts = []; //found id
        isProductInDB.rows.forEach((item) => arrProducts.push(item.id));
        parseProducts.forEach((productId) => {
          if (!arrProducts.includes(productId)) {
            notFoundIdProducts.push(productId);
          }
        });
        return ApiError.badRequest(
          res.json(
            `Some productes of id(${notFoundIdProducts.join(
              ", "
            )}) not exist in DB`
          )
        );
      }

      return res.json("Thank you for you order! We will contact you shortly");
    } catch (e) {
      return res.json(e);
    }
  }

  async updateOrder(req, res) {
    try {
      const { complete, id } = req.body;

      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Orders.update({ complete }, { where: { id } }).then(
            (data_prod) => {
              if (complete) {
                const notification = Notification.create({
                  notification_message: `Ваш заказ №${id} успешно прибыл в пунк назначения! Ждем ваш отзыв по данному товару.`,
                  userId: data.userId,
                }).then((data) => {
                  return res.json("Order updated");
                });
              } else {
                return res.json("Order updated");
              }
            }
          );
        } else {
          return res.json("This order doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Updated didn't complete because was error: " + e);
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Orders.destroy({ where: { id } }).then(() => {
            return res.json("Order deleted");
          });
        } else {
          return res.json("This order doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Delete didn't complete because was error: " + e);
    }
  }

  async getAll(req, res) {
    let { limit, page, complete } = req.query;
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let products;
    if (complete === "not-completed") {
      products = await Orders.findAndCountAll({
        where: { complete: false },
        limit,
        offset,
      });
    } else if (complete === "completed") {
      products = await Orders.findAndCountAll({
        where: { complete: true },
        limit,
        offset,
      });
    } else {
      products = await Orders.findAndCountAll({ limit, offset });
    }

    return res.json(products);
  }

  async getAllUser(req, res) {
    let { userId, limit, page, complete } = req.query;
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let products;
    if (complete === "not-completed") {
      products = await Orders.findAndCountAll({
        where: { complete: false, userId: userId },
        limit,
        offset,
      });
    } else if (complete === "completed") {
      products = await Orders.findAndCountAll({
        where: { complete: true, userId: userId },
        limit,
        offset,
      });
    } else {
      products = await Orders.findAndCountAll({
        where: { userId: userId },
        limit,
        offset,
      });
    }

    return res.json(products);
  }

  async getCountOrdersInMonth(req, res) {
    let orders;
    orders = await Orders.findAll({
      attributes: [
        [
          sequelize.fn("DATE_TRUNC", "month", sequelize.col("createdAt")),
          "month",
        ],
        [sequelize.fn("COUNT", "id"), "totalCount"],
      ],
      group: [sequelize.fn("date_trunc", "month", sequelize.col("createdAt"))],
      order: [sequelize.fn("date_trunc", "month", sequelize.col("createdAt"))]
    });

    return res.json(orders);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const order = {};
    try {
      let prod;
      let infoProductes = [];
      await Orders.findOne({ where: { id } })
        .then(async (data) => {
          order.descr = data;
          prod = await OrderProduct.findAll({
            attributes: ["productId", "count"],
            where: { orderId: data.id },
          });

          for (let product of prod) {
            await Product.findOne({
              attributes: ["id", "name", "imgMain", "price"],
              where: { id: product.productId },
              include: [
                {
                  attributes: ["name"],
                  model: ProductType,
                },
                {
                  attributes: ["name"],
                  model: ProductBrand,
                },
              ],
            }).then(async (item) => {
              let newObj = {
                descr: item,
                count: product.count,
              };
              infoProductes.push(newObj);
            });
          }
          order.prod = infoProductes;

          return res.json(order);
        })
        .catch(() => {
          return res.json("Order doesn't exist in data base");
        });
    } catch (e) {
      return res.json("Delete didn't complete because was error: " + e);
    }
  }

  async getOneUserOrders(req, res) {
    let { userId, limit, page, complete } = req.query;

    page = page || 1;
    limit = limit || 7;

    let offset = page * limit - limit;
    let products;
    if (complete === "not-completed") {
      products = await Orders.findAndCountAll({
        where: { complete: false, userId: userId },
        limit,
        offset,
      });
    } else if (complete === "completed") {
      products = await Orders.findAndCountAll({
        where: { complete: true, userId: userId },
        limit,
        offset,
      });
    } else {
      products = await Orders.findAndCountAll({
        where: { userId: userId },
        limit,
        offset,
      });
    }

    return res.json(products);
  }
}

module.exports = new OrdersController();
