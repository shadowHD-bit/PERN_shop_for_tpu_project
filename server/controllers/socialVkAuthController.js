const ApiError = require("../errors/ApiErrors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket, Likes, VkUsers } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

class SocialVkAuthController {
  async authAndRegistrationSocialVk(req, res, next) {
    const {
      email,
      password,
      name,
      family,
      date_birthday,
      numberPhone,
      gender,
      allowSpam,
      id_social,
      role,
      img_user,
    } = req.body;
    console.log(req.body);

    const candidate = await VkUsers.findOne({
      where: { id_social: id_social },
    });

    if (candidate) {
      let token;
      await VkUsers.findOne({
        where: { id_social: id_social },
      }).then((data) => {
        User.findOne({ where: { id: data.userId } }).then((user) => {
          console.log(user);
          token = generateJwt(
            user.dataValues.id,
            user.dataValues.email,
            user.dataValues.role
          );
          return res.json({ token });
        });
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        family,
        date_birthday,
        numberPhone,
        email,
        role,
        gender,
        allowSpam,
        img_user,
        password: hashPassword,
        isVK: true,
        isGoogle: false,
      });
      const vk_user = await VkUsers.create({
        userId: user.id,
        id_social: id_social,
      });
      const basket = await Basket.create({ userId: user.id });
      const likes = await Likes.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    }
  }
}

module.exports = new SocialVkAuthController();
