const sequelize = require("../dataBase");
const { DataTypes } = require("sequelize");

//Models User
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  family: { type: DataTypes.STRING },
  date_birthday: { type: DataTypes.STRING },
  numberPhone: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

//Models Basket
const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Models BasketProducts
const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER },
});

//Models Likes_product
const Likes = sequelize.define("likes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Models BasketProducts
const LikesProduct = sequelize.define("likes_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER },
});

//Models Product
const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.DOUBLE, defaultValue: 0 },
  description: { type: DataTypes.STRING, defaultValue: "Нет описания...",allowNull: true},
  imgMain: { type: DataTypes.STRING, allowNull: true },
  imgFirst: { type: DataTypes.STRING, allowNull: true },
  imgSecond: { type: DataTypes.STRING, allowNull: true },
  imgThird: { type: DataTypes.STRING, allowNull: true },
  display: { type: DataTypes.BOOLEAN, defaultValue: false },
});

//Models Type Product
const ProductType = sequelize.define("product_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

//Models Brand Product
const ProductBrand = sequelize.define("product_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

//Models Rating
const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.DOUBLE, allowNull: false },
});

//Models Slider
const Slider = sequelize.define("slider", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
});

//Models Info Product
const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

//ConnectionTable Brand and Types
const ProductTypeBrand = sequelize.define("product_type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Orders
const Orders = sequelize.define("orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  complete: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
});

//Question
const Question = sequelize.define("question_about_product", {
  id_question: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question_text: { type: DataTypes.STRING, allowNull: false},
  complete_question: { type: DataTypes.BOOLEAN, defaultValue: false},
});

//Answer
const Answer = sequelize.define("answer_to_question", {
  id_answer: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  answer_text: { type: DataTypes.STRING, allowNull: false},
});

//Connection Table Orders and Product
const OrderProduct = sequelize.define("order_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  count: { type: DataTypes.INTEGER, allowNull: false },
});

//Description dependencies models db
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Likes);
Likes.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Product.hasMany(Question);
Question.belongsTo(Product);

User.hasMany(Question);
Question.belongsTo(User);

Question.hasOne(Answer);
Answer.belongsTo(Question);

User.hasMany(Answer);
Answer.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Likes.hasMany(LikesProduct);
LikesProduct.belongsTo(Likes);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

ProductBrand.hasMany(Product);
Product.belongsTo(ProductBrand);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Product.hasMany(LikesProduct);
LikesProduct.belongsTo(Product);

Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

ProductType.belongsToMany(ProductBrand, { through: ProductTypeBrand });
ProductBrand.belongsToMany(ProductType, { through: ProductTypeBrand });

User.hasMany(Orders);
Orders.belongsTo(User, {
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
});

Orders.hasMany(OrderProduct);
OrderProduct.belongsTo(Orders, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  ProductType,
  ProductBrand,
  Rating,
  ProductTypeBrand,
  ProductInfo,
  Slider,
  OrderProduct,
  Orders,
  Question,
  Answer,
  Likes,
  LikesProduct,
};
