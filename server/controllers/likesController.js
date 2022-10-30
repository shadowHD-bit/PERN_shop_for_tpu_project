const {Likes, LikesProduct, Product, ProductInfo, ProductBrand, ProductType} = require('../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

class LikesController {
    async addProducts(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const likes = await Likes.findOne({where: {userId: user.id}});
            await LikesProduct.create({likeId : likes.id, productId: id});
            return res.json("Product added in likes");
        } catch (e) {
            console.error(e);
        }
    }

    async getProducts(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const {id} = await Likes.findOne({where: {userId: user.id}});
            const like = await LikesProduct.findAll({where: {likeId: id}});

            const likesArr = [];
            for(let i = 0; i < like.length; i++) {
                const likes_product = await Product.findOne({
                        where: {
                            id: like[i].productId,
                        },
                        include: {
                            model: ProductInfo, as: "info",
                            where: {
                                productId: like[i].productId,
                                [Op.or]: [
                                    {
                                        productId: {
                                            [Op.not]: null
                                        }
                                    }
                                ],
                            },
                            required: false}
                        }
                        );
                likesArr.push(likes_product);
            }

            return res.json(likesArr);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteProduct(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Likes.findOne({where: {userId: user.id}}).then(async userLikes => {
                if(userLikes.userId === user.id) {
                    await LikesProduct.destroy({where: {likeId: userLikes.id, productId: id}})
                }
                return res.json(`You haven't access for delete the product(${id}) from likes that didn't belong to you`);
            });
            return res.json("Product deleted form your likes");
        } catch (e) {
            console.error(e);
        }
    }

}

module.exports = new LikesController();