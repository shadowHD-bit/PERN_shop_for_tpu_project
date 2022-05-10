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

//Models BasketProducts
const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER},
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

//Models Slider
const Slider = sequelize.define('slider', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false}
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

//Orders 
const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    complete: {type: DataTypes.BOOLEAN, defaultValue: false},
    mobile: {type: DataTypes.STRING(25), allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: true},
})

//Connection Table Orders and Product
const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER, allowNull: false},
    orderId: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
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

User.hasMany(Orders);
Orders.belongsTo(User,
    {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
    }
);

Orders.hasMany(OrderProduct);
OrderProduct.belongsTo(Orders,
    {
        foreignKey: { name: 'orderId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
);

module.exports = {
    User, Basket, BasketProduct, Product, ProductType, ProductBrand, Rating, ProductTypeBrand, ProductInfo, Slider, OrderProduct, Orders
}