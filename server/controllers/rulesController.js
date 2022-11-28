const uuid = require("uuid");
const path = require("path");
const { Slider, Sizes, ProductSizes, Rules } = require("../models/models");
const ApiError = require("../errors/ApiErrors");

class rulesController {
  async createRules(req, res, next) {
    try {
      let { name_rules, information_rules } = req.body;
      const rule = await Rules.create({
        name_rules: name_rules,
        information_rules: information_rules,
      });

      return res.json(rule);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getRules(req, res) {
    let rule = await Rules.findAndCountAll();
    return res.json(rule);
  }

  async getOneRules(req, res) {
    const { id } = req.params;
    let rule = await Rules.findOne({
      where: { id: id },
    });
    return res.json(rule);
  }

  async deleteRules(req, res) {
    try {
      const { id } = req.params;
      await Rules.findOne({ where: { id: id } }).then(async (data) => {
        if (data) {
          await Rules.destroy({ where: { id: id } }).then(() => {
            return res.json("Правило удалено");
          });
        } else {
          return res.json("Этого Правила нет в базе данных...");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }

  async updateRules(req, res) {
    try {
      let { id, name_rules, information_rules } = req.body;

      await Rules.findOne({ where: { id: id } }).then((data) => {
        if (data) {
          Rules.update(
            { name_rules: name_rules, information_rules: information_rules },
            { where: { id } }
          ).then(() => {
            return res.json("Rules updated");
          });
        } else {
          return res.json("This Rules doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Updated didn't complete because was error: " + e);
    }
  }
}

module.exports = new rulesController();
