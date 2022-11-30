const ApiError = require("../errors/ApiErrors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  Basket,
  Likes,
  VkUsers,
  GoogleUsers,
} = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

class SocialGoogleAuthController {
  async authAndRegistrationSocialGoogle(req, res, next) {
    const {
      email,
      password,
      name,
      family,
      allowSpam,
      id_social,
      role,
      img_user,
    } = req.body;

    const candidate = await GoogleUsers.findOne({
      where: { id_social: id_social },
    });

    const simple_candidate = await User.findOne({
      where: { email: email },
    });

    if (candidate) {
      let token;
      await GoogleUsers.findOne({
        where: { id_social: id_social },
      }).then((data) => {
        User.findOne({ where: { id: data.userId } }).then((user) => {
          token = generateJwt(
            user.dataValues.id,
            user.dataValues.email,
            user.dataValues.role
          );
          return res.json({ token });
        });
      });
    } else if (simple_candidate) {
      let token;
      await User.findOne({
        where: { email: email },
      }).then((user) => {
        token = generateJwt(
          user.dataValues.id,
          user.dataValues.email,
          user.dataValues.role
        );
        return res.json({ token });
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        family,
        email,
        role,
        allowSpam,
        img_user,
        password: hashPassword,
        isVK: false,
        isGoogle: true,
      });
      const google_user = await GoogleUsers.create({
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

module.exports = new SocialGoogleAuthController();
