const uuid = require("uuid");
const path = require("path");
const { Slider, Sizes, ProductSizes, Coupons } = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class CouponController {
  async createCoupon(req, res, next) {
    try {
      let { code, discount_percentage } = req.body;
      const coupon = await Coupons.create({ code, discount_percentage });
      return res.json(coupon);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getCoupons(req, res) {
    let coupon = await Coupons.findAndCountAll();
    return res.json(coupon);
  }

  async getOneCoupon(req, res) {
    const { code } = req.params;
    const coupon = await Coupons.findOne({
      where: { code: code },
    })
    return res.json(coupon);

  }

  async deleteCoupon(req, res) {
    try {
      const { id } = req.params;

      await Coupons.destroy({ where: { id } }).then(() => {
        return res.json("Купон удален");
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new CouponController();
