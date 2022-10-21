const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");
const {
  Question,
  Product,
  Answer,
  ProductBrand,
  ProductType,
  OrderProduct,
  Orders,
  User,
} = require("../models/models");
const { badRequest } = require("../errors/ApiErrors");

class excelController {
  async getProductExcel(req, res) {
    let { productBrandId, productTypeId } = req.query;
    let product;

    if (!productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],
        where: { productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (!productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],
        where: { productTypeId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],

        where: { productTypeId, productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    return res.json(product);
  }

  async getOrderExcel(req, res) {
    let { complete } = req.query;
    let products;
    if (complete === "not-completed") {
      products = await Orders.findAndCountAll({
        attributes: [
          ["complete", "Статус_заказа"],
          ["userId", "ID_пользователя"],
          ["createdAt", "Дата_оформления"],
          ["updatedAt", "Дата_завершения"],
        ],
        where: { complete: false },
        include: [
          {
            model: OrderProduct,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_товара"],
              ["orderId", "ID_заказа"],
              ["count", "Количество_товара"],
            ],
            include: [
              {
                model: Product,
                attributes: [
                  ["name", "Наименование_товара"],
                  ["price", "Цена_товара"],
                ],
                include: [
                  { model: ProductBrand, attributes: ["name"] },
                  { model: ProductType, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["name", "Имя"],
              ["family", "Фамилия"],
            ],
          },
        ],
      });
    } else if (complete === "completed") {
      products = await Orders.findAndCountAll({
        attributes: [
          ["complete", "Статус_заказа"],
          ["userId", "ID_пользователя"],
          ["createdAt", "Дата_оформления"],
          ["updatedAt", "Дата_завершения"],
        ],
        where: { complete: true },
        include: [
          {
            model: OrderProduct,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_товара"],
              ["orderId", "ID_заказа"],
              ["count", "Количество_товара"],
            ],
            include: [
              {
                model: Product,
                attributes: [
                  ["name", "Наименование_товара"],
                  ["price", "Цена_товара"],
                ],
                include: [
                  { model: ProductBrand, attributes: ["name"] },
                  { model: ProductType, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["name", "Имя"],
              ["family", "Фамилия"],
            ],
          },
        ],
      });
    } else {
      products = await Orders.findAndCountAll({
        attributes: [
          ["complete", "Статус_заказа"],
          ["userId", "ID_пользователя"],
          ["createdAt", "Дата_оформления"],
          ["updatedAt", "Дата_завершения"],
        ],
        include: [
          {
            model: OrderProduct,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_товара"],
              ["orderId", "ID_заказа"],
              ["count", "Количество_товара"],
            ],
            include: [
              {
                model: Product,
                attributes: [
                  ["name", "Наименование_товара"],
                  ["price", "Цена_товара"],
                ],
                include: [
                  { model: ProductBrand, attributes: ["name"] },
                  { model: ProductType, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["name", "Имя"],
              ["family", "Фамилия"],
            ],
          },
        ],
      });
    }

    return res.json(products);
  }

  async getProductExcel(req, res) {
    let { productBrandId, productTypeId } = req.query;
    let product;

    if (!productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],
        where: { productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (!productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],
        where: { productTypeId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "Наименование"],
          ["price", "Цена"],
          ["rating", "Рейтинг"],
        ],

        where: { productTypeId, productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    return res.json(product);
  }

  async getBrandExcel(req, res) {
    let brands_res;
    brands_res = await ProductBrand.findAll({
        attributes: [
          ["id", "Номер"],
          ["name", "Наименование"],
          ["createdAt", "Дата_добавления"],
        ],
      });

    return res.json(brands_res);
  }

  async getTypeExcel(req, res) {
    let types_res;
    types_res = await ProductType.findAll({
        attributes: [
          ["id", "Номер"],
          ["name", "Наименование"],
          ["createdAt", "Дата_добавления"],
        ],
      });

    return res.json(types_res);
  }

  async getUsersExcel(req, res) {
    let users_res;
    users_res = await User.findAll({
        attributes: [
          ["name", "Имя"],
          ["family", "Фамилия"],
          ["date_birthday", "Дата_рождения"],
          ["role", "Роль"],
          ["createdAt", "Дата_регистрации"],
        ],
      });

    return res.json(users_res);
  }
}

module.exports = new excelController();
