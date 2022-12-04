const { HistoryViewProduct, Product } = require("../models/models");

class HistoryViewProductController {
  async getHistory(req, res) {
    const { id } = req.params;

    const history = await HistoryViewProduct.findAll({
      where: { userId: id },
      include: [{ model: Product }],
      order: [["createdAt", "DESC"]],
    });

    return res.json(history);
  }

  async addInHistory(req, res) {
    const { userId, productId } = req.body;

    await HistoryViewProduct.findOne({
      where: { userId, productId },
    }).then(async (data_history) => {

      if (data_history) {
        await HistoryViewProduct.destroy({
          where: {
            userId: data_history.userId,
            productId: data_history.productId,
          },
        }).then(async () => {
          await HistoryViewProduct.create({
            userId,
            productId,
          });
        });

      } else {

        await HistoryViewProduct.findAndCountAll({
          where: { userId: userId },
        }).then(async (data) => {
          if ((data.count == 5)) {

            await HistoryViewProduct.findAll({
              order: [["createdAt", "ASC"]],
              limit: 1,
            }).then(async (data_first_row) => {
              await HistoryViewProduct.destroy({
                where: {
                  userId: data_first_row[0].userId,
                  productId: data_first_row[0].productId,
                },
              }).then(async () => {
                await HistoryViewProduct.create({
                  userId,
                  productId,
                });
              });
            });
            
          } else {
            await HistoryViewProduct.create({
              userId,
              productId,
            });
          }
        });
      }
    });

    return res.send("This product add history");
  }
}

module.exports = new HistoryViewProductController();
