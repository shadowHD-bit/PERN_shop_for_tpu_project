const uuid = require("uuid");
const path = require("path");
const {
  Slider,
  Sizes,
  ProductSizes,
  Notification,
} = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class NotificationController {
  async createNotification(req, res, next) {
    try {
      let { notification_message, userId } = req.body;
      const notification = await Notification.create({
        notification_message: notification_message,
        userId: userId,
      });

      return res.json(notification);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getNotificationUser(req, res) {
    try {
      const { id } = req.params;

      await Notification.findAndCountAll({ where: { userId: id } }).then(
        (data) => {
          return res.json(data);
        }
      );
    } catch (e) {
      return res.json(e);
    }
  }

  async deleteNotification(req, res) {
    try {
      const { id } = req.params;

      await Notification.destroy({ where: { id: id } }).then((data) => {
        return res.json("Уведомление удалено");
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new NotificationController();
