const uuid = require("uuid");
const path = require("path");
const { ProductBadge, Product, LocationPlace } = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class LocationController {
  async createLocation(req, res, next) {
    try {
      let { title, description, text_address, x_coordination, y_coordination } =
        req.body;
      const location = await LocationPlace.create({
        title,
        description,
        text_address,
        x_coordination,
        y_coordination,
      });
      return res.json(location);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateLocation(req, res) {
    try {
      let { id } = req.params;
      let { title, description, text_address, x_coordination, y_coordination } =
        req.body;
      const location = await LocationPlace.update({
        title,
        description,
        text_address,
        x_coordination,
        y_coordination,
      }, {where: {id}});
      return res.json(location);
    } catch (e) {
      res.send("Ошибка при обновлении!");
    }
  }

  async getLocations(req, res) {
    let locations = await LocationPlace.findAndCountAll();
    return res.json(locations);
  }

  async getOneLocation(req, res) {
    const { id } = req.params;
    let location = await LocationPlace.findOne({ where: { id } });
    return res.json(location);
  }

  async deleteLocation(req, res) {
    try {
      const { id } = req.params;
      LocationPlace.destroy({ where: { id } }).then(() => {
        return res.json("Позиция удалена");
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new LocationController();
