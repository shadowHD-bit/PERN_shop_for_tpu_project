const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");
const { Question, Product, Answer, User } = require("../models/models");
const { badRequest } = require("../errors/ApiErrors");

class QuestionController {
  async createQuestion(req, res, next) {
    let { id_product, id_user_question, text_question } = req.body;

    try {
      const created_question = Question.create({
        question_text: text_question,
        productId: id_product,
        userId: id_user_question,
      });
      return res.json(created_question);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getQuestions(req, res) {
    let { limit, page, complete } = req.query;
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let question = {};
    let info_products = [];
    if (complete == "not-completed") {
      question = await Question.findAndCountAll({
        include: [
          {
            model: Product,
            required: true,
          },
          {
            model: Answer,
            required: false,
          },
        ],
        where: { complete_question: false },
        limit,
        offset,
      });
    } else if (complete == "completed") {
      question = await Question.findAndCountAll({
        include: [
          {
            model: Product,
            required: true,
          },
          {
            model: Answer,
            required: false,
          },
        ],
        where: { complete_question: true },
        limit,
        offset,
      });
    } else {
      question = await Question.findAndCountAll({
        include: [
          {
            model: Product,
            required: true,
          },
          {
            model: Answer,
            required: false,
          },
        ],
        limit,
        offset,
      });
    }

    return res.json(question);
  }

  async getQuestionOneProduct(req, res) {
    const { id } = req.params;

    let info_qa = [];
    let QA = {};
    await Question.findAll({
      where: { productId: id, complete_question: true },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    }).then(async (data_question) => {
      for (let quest of data_question) {
        await Answer.findOne({
          where: { questionAboutProductIdQuestion: quest.id_question },
          include: [
            {
              model: User,
              required: true,
            },
          ],
        }).then(async (data_answer) => {
          let new_obj = {
            question: quest,
            answer: data_answer,
          };
          info_qa.push(new_obj);
        });
      }
    });
    QA = info_qa;
    return res.json(QA);
  }

  async getBoolQuestionOneUserNotComplete(req, res) {
    const {id, product_id } = req.query;
    await Question.findAll({
      where: { productId: product_id, complete_question: false, userId: id},
    }).then((data) => {
      console.log(data);
      if(data.length !== 0){
        return res.json(true);
      }
      else{
        return res.json(false);
      }
    });
  }

  async updateStatusQuestion(req, res) {
    try {
      const { complete_question, id_question } = req.body;

      await Question.findOne({ where: { id_question: id_question } }).then(
        async (data) => {
          if (data) {
            await Question.update(
              { complete_question: complete_question },
              { where: { id_question: id_question } }
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

  async deleteQuestion(req, res) {
    try {
      const { id } = req.params;
      await Question.findOne({ where: { id_question: id } }).then(
        async (data) => {
          if (data) {
            await Answer.findOne({
              where: { questionAboutProductIdQuestion: id },
            }).then(async (data_answer) => {
              if (data_answer) {
                await Answer.destroy({
                  where: { questionAboutProductIdQuestion: id },
                });
              }
            });
            await Question.destroy({
              where: { id_question: id },
            }).then(() => {
              return res.json("Вопрос удален");
            });
          } else {
            return res.json("Этого вопроса нет в базе данных...");
          }
        }
      );
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new QuestionController();
