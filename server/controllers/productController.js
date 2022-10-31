const uuid = require("uuid");
const path = require("path");
const {
  Product,
  ProductInfo,
  ProductBrand,
  ProductType,
} = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class ProductController {
  async createProduct(req, res, next) {
    try {
      let { name, price, productBrandId, productTypeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const { imgOne } = req.files;
      let fileNameOne = uuid.v4() + ".jpg";
      imgOne.mv(path.resolve(__dirname, "..", "static", fileNameOne));

      const { imgTwo } = req.files;
      let fileNameTwo = uuid.v4() + ".jpg";
      imgTwo.mv(path.resolve(__dirname, "..", "static", fileNameTwo));

      const { imgThree } = req.files;
      let fileNameThree = uuid.v4() + ".jpg";
      imgThree.mv(path.resolve(__dirname, "..", "static", fileNameThree));

      const product = await Product.create({
        name,
        price,
        productBrandId,
        productTypeId,
        imgMain: fileName,
        imgFirst: fileNameOne,
        imgSecond: fileNameTwo,
        imgThird: fileNameThree,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        );
      }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createMoreProduct(req, res, next) {
    let products = req.body;
    await products.map((prod) => {
      try {
        // let { name, price, productBrandId, productTypeId }
        let name = prod.name;
        let price = prod.price;
        let productBrandId = prod.productBrandId;
        let productTypeId = prod.productTypeId;
        let description = prod.description;

        const product = Product.create({
          name,
          price,
          productBrandId,
          productTypeId,
          description,
        });

        return res.json(product);
      } catch (e) {
        next(ApiError.badRequest(e.message));
      }
    });
  }

  async getProduct(req, res) {
    let { productBrandId, productTypeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let product;
    if (!productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        limit,
        include: [{ model: ProductBrand }, { model: ProductType }],
        offset,
      });
    }
    if (productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        where: { productBrandId },
        include: [{ model: ProductBrand }, { model: ProductType }],
        limit,
        offset,
      });
    }
    if (!productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        where: { productTypeId },
        include: [{ model: ProductBrand }, { model: ProductType }],
        limit,
        offset,
      });
    }
    if (productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        where: { productTypeId, productBrandId },
        include: [{ model: ProductBrand }, { model: ProductType }],
        limit,
        offset,
      });
    }
    return res.json(product);
  }

  async getProductForAdmin(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let product;

    product = await Product.findAndCountAll({
      limit,
      include: [{ model: ProductBrand }, { model: ProductType }],
      offset,
    });

    return res.json(product);
  }

  async getOneProduct(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductInfo, as: "info" },
        { model: ProductBrand },
        { model: ProductType },
      ],
    });
    return res.json(product);
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Product.destroy({ where: { id } }).then(() => {
            return res.json("Продукт удален");
          });
        } else {
          return res.json("Этого продукта нет в базе данных...");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { productBrandId, productTypeId, name, price, info } = req.body;

      await Product.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          let newVal = {};
          productBrandId ? (newVal.productBrandId = productBrandId) : false;
          productTypeId ? (newVal.productTypeId = productTypeId) : false;
          name ? (newVal.name = name) : false;
          price ? (newVal.price = price) : false;

          if (req.files) {
            if (req.files.imgMain) {
              const { imgMain } = req.files;
              const type = imgMain.mimetype.split("/")[1];
              let fileName = uuid.v4() + `.${type}`;
              imgMain.mv(path.resolve(__dirname, "..", "static", fileName));
              newVal.imgMain = fileName;
            }

            if (req.files.imgFirst) {
              const { imgFirst } = req.files;
              const typeFirst = imgFirst.mimetype.split("/")[1];
              let fileNameFirst = uuid.v4() + `.${typeFirst}`;
              imgFirst.mv(
                path.resolve(__dirname, "..", "static", fileNameFirst)
              );
              newVal.imgFirst = fileNameFirst;
            }

            if (req.files.imgSecond) {
              const { imgSecond } = req.files;
              const typeSecond = imgSecond.mimetype.split("/")[1];
              let fileNameSecond = uuid.v4() + `.${typeSecond}`;
              imgSecond.mv(
                path.resolve(__dirname, "..", "static", fileNameSecond)
              );
              newVal.imgSecond = fileNameSecond;
            }

            if (req.files.imgThird) {
              const { imgThird } = req.files;
              const typeThird = imgThird.mimetype.split("/")[1];
              let fileNameThird = uuid.v4() + `.${typeThird}`;
              imgThird.mv(
                path.resolve(__dirname, "..", "static", fileNameThird)
              );
              newVal.imgThird = fileNameThird;
            }
          }

          if (info) {
            const parseInfo = JSON.parse(info);
            for (const item of parseInfo) {
              await ProductInfo.findOne({ where: { id: item.id } }).then(
                async (data) => {
                  if (data) {
                    await ProductInfo.update(
                      {
                        title: item.title,
                        description: item.description,
                      },
                      { where: { id: item.id } }
                    );
                  } else {
                    await ProductInfo.create({
                      title: item.title,
                      description: item.description,
                      productId: id,
                    });
                  }
                }
              );
            }
          }

          await Product.update(
            {
              ...newVal,
            },
            { where: { id } }
          ).then(() => {
            return res.json("Продукт обновлен");
          });
        } else {
          return res.json("Этого продукта нет в базе данных!");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }

  async updateDisplay(req, res) {
    try {
      const { display, id } = req.body;

      await Product.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Product.update(
            {
              display,
            },
            { where: { id } }
          ).then(() => {
            return res.json("Продукт обновлен");
          });
        } else {
          return res.json("Этого продукта нет в базе данных!");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }

  async getSearchAllProductByName(req, res, next) {
    try {
      let { limit, page, name, filter } = req.query;

      page = page || 1;
      limit = limit || 7;
      let offset = page * limit - limit;
      if (filter === "All") {
        const productes = await Product.findAndCountAll({
          attributes: ["name", "price", "imgMain", "id"],
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          include: [
            {
              attributes: ["name"],
              model: ProductBrand,
            },
            {
              attributes: ["name"],
              model: ProductType,
            },
          ],
          limit,
          offset,
        });

        return res.json(productes);
      } else {
        const productes = await Product.findAndCountAll({
          attributes: [
            "name",
            "price",
            "imgMain",
            "id",
            "productBrandId",
            "productTypeId",
          ],
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
            [Op.or]: [
              {
                productBrandId: null,
              },
              {
                productTypeId: null,
              },
            ],
          },
          include: [
            {
              attributes: ["name"],
              model: ProductBrand,
            },
            {
              attributes: ["name"],
              model: ProductType,
            },
          ],
          limit,
          offset,
        });
        return res.json(productes);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
