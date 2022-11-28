const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");
const { Question, Product, Answer, Notification } = require("../models/models");
const { badRequest } = require("../errors/ApiErrors");

class AnswerController {
  async createAnswer(req, res, next) {
    let { id_question, id_user_answer, text_answer } = req.body;

    try {
      const created_answer = Answer.create({
        answer_text: text_answer,
        questionAboutProductIdQuestion: id_question,
        userId: id_user_answer,
      }).then((data) => {
        Question.findOne({ where: { id_question: id_question } }).then(
          (data_ques) => {
            Product.findOne({ where: { id: data_ques.productId } }).then(
              (data_prod) => {
                const notification = Notification.create({
                  notification_message: `Администрация ответила на ваш вопрос по товару ${data_prod.name}`,
                  userId: data_ques.userId,
                }).then(() => {
                  return res.json(created_answer);
                });
              }
            );
          }
        );
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOneAnswer(req, res) {
    const { id_answer } = req.params;
    const answer = await Answer.findOne({
      where: { id_answer },
    });
    return res.json(answer);
  }

  async updateAnswer(req, res) {
    try {
      const { id_answer, text_answer } = req.body;

      await Answer.findOne({ where: { id_answer: id_answer } }).then(
        async (data) => {
          if (data) {
            await Answer.update(
              { answer_text: text_answer },
              { where: { id_answer: id_answer } }
            ).then(() => {
              return res.json("Question updated");
            });
          } else {
            return res.json("This Question doesn't exist in DB");
          }
        }
      );
    } catch (e) {
      return res.json("Updated didn't complete because was error: " + e);
    }
  }
}

module.exports = new AnswerController();
