const sequelize = require('../dataBase')
const {DataTypes} = require('sequelize')


//Models User
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    family: {type: DataTypes.STRING},
    date_birthday: {type: DataTypes.STRING},
    numberPhone: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

//Models Basket
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//Models BasketProducs
const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//Models Product
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    imgMain: {type: DataTypes.STRING, allowNull: false},
    imgFirst: {type: DataTypes.STRING, allowNull: true},
    imgSecond: {type: DataTypes.STRING, allowNull: true},
    imgThird: {type: DataTypes.STRING, allowNull: true}
})

//Models Type Product
const ProductType = sequelize.define('product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

//Models Brand Product
const ProductBrand = sequelize.define('product_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

//Models Rating
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

//Models Info Product
const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

//ConnectionTable Brand and Types
const ProductTypeBrand = sequelize.define('product_type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


//Description dependencies models db
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

ProductBrand.hasMany(Product)
Product.belongsTo(ProductBrand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

ProductType.belongsToMany(ProductBrand, {through: ProductTypeBrand})
ProductBrand.belongsToMany(ProductType, {through: ProductTypeBrand})

module.exports = {
    User, Basket, BasketProduct, Product, ProductType, ProductBrand, Rating, ProductTypeBrand, ProductInfo
}