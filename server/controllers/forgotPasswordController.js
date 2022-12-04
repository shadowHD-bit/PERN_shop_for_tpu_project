const ApiError = require("../errors/ApiErrors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, ResetPasswordTokens } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const sequelize = require("sequelize");
const { Sequelize } = require("../utils/dataBase");
const { group } = require("console");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });
};

class ForgotPasswordController {
  async getResetPasswordLink(req, res, next) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.send(
        "Пользователь с таким адресом электронной почты не найден!"
      );
    } else {
      await ResetPasswordTokens.findOne({ where: { userId: user.id } }).then(
        (data) => {
          if (data) {
            ResetPasswordTokens.destroy({ where: { userId: user.id } });
          }
        }
      );

      const token = generateJwt(user.id, user.email);
      await ResetPasswordTokens.create({
        token: token,
        userId: user.id,
      });
      const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Восстановление пароля на сайте SHOP.RU",
        text: "",
        html: `
            <div>
                <h1>Для восстановления пароля перейдите по ссылке:<h1>
                <a href="${link}">Ссылка</a>
            </div>
        `,
      });
      return res.send(
        "На вашу почту отправлено письмо с ссылкой на странинцу востановления пароля!"
      );
    }
  }

  async resetPassword(req, res) {
    const { token, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);

    ResetPasswordTokens.findOne({ where: { token: token } }).then((data) => {
      User.update(
        { password: hashPassword },
        { where: { id: data.dataValues.userId } }
      ).then((data_user) => {
        ResetPasswordTokens.destroy({ where: { token: token } }).then(() => {
          res.send("Данные пароля обновлены!");
        });
      });
    });
  }

  async checkToken(req, res) {
    const { token } = req.body;

    let tokenInDatabase = null;
    ResetPasswordTokens.findOne({ where: { token: token } }).then((data) => {
      if (data) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  }
}

module.exports = new ForgotPasswordController();
