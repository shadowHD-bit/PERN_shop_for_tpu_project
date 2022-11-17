const uuid = require("uuid");
const path = require("path");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");
const {
  Reviews,
  OrderProduct,
  ReviewsProduct,
  User,
  Product,
} = require("../models/models");

class ReviewController {
  async createReview(req, res, next) {
    try {
      let {
        text_review,
        description_true,
        size_true,
        delivery_true,
        product_id,
        user_id,
      } = req.body;

      let fileName;

      if (req.files) {
        const { img_reviews } = req.files;
        fileName = uuid.v4() + ".jpg";
        img_reviews.mv(
          path.resolve(__dirname, "..", "static_review", fileName)
        );
      } else {
        fileName = "not img";
      }

      const review = await Reviews.create({
        userId: user_id,
      }).then((review) => {
        const { id } = review.get();
        ReviewsProduct.create({
          text_reviews: text_review,
          img_reviews: fileName,
          description_true: description_true,
          size_true: size_true,
          delivery_true: delivery_true,
          reviewId: id,
          productId: product_id,
        });
      });

      return res.json(review);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getReviewOneProduct(req, res) {
    const { id } = req.params;

    let reviews = await ReviewsProduct.findAll({
      where: { productId: id },
      include: [
        {
          model: Reviews,
          required: true,
          include: [
            {
              model: User,
              required: true,
            },
          ],
        },
      ],
    });

    return res.json(reviews);
  }

  async getReviewAll(req, res) {
    let reviews = await ReviewsProduct.findAndCountAll({
      include: [
        {
          model: Reviews,
          required: true,
          include: [
            {
              model: User,
              required: true,
            },
          ],
        },
        {
          model: Product,
          require: true,
        },
      ],
    });

    return res.json(reviews);
  }

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      await ReviewsProduct.findOne({ where: { id } }).then(async (data) => {
        if (data) {
           ReviewsProduct.destroy({ where: { id } }).then(() => {
            Reviews.destroy({ where: { id:data.reviewId } }).then(() => {
              return res.json("Отзыв удален удален");
            });
          });
        } else {
          return res.json("Этого отзыва нет в базе данных...");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new ReviewController();
