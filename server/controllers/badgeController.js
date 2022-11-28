const uuid = require("uuid");
const path = require("path");
const { ProductBadge, Product } = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class BadgeController {
  async createBadge(req, res, next) {
    try {
      let { name_badge } = req.body;
      const size = await ProductBadge.create({ name_badge });

      return res.json(size);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getBadges(req, res) {
    let sizes = await ProductBadge.findAndCountAll();
    return res.json(sizes);
  }

  async deleteBadge(req, res) {
    try {
      const { id } = req.params;

      Product.update(
        { productBadgeId: null },
        {
          where: { productBadgeId: id },
        }
        
      ).then(data => {
        ProductBadge.destroy({ where: { id } }).then(() => {
            return res.json("Бадж удален");
          });
      });

    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new BadgeController();
