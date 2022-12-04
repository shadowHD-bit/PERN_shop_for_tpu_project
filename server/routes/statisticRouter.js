const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();

const ordersController = require('./../controllers/ordersController');

/**
 * @openapi
 * '/api/statistic/statistic_order/count_in_months':
 *  get:
 *     tags:
 *     - Statistic
 *     summary: Получает данные о количестве заказов в каждый месяц
 *
 *     responses:
 *       200:
 *         description: Список заказов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       month:
 *                         type: string
 *                         example: 06.2021
 *                       count:
 *                         type: integer
 *                         example: 6
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Данные не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get('/statistic_order/count_in_months', ordersController.getCountOrdersInMonth)

/**
 * @openapi
 * '/api/statistic/statistic_user/count_in_months':
 *  get:
 *     tags:
 *     - Statistic
 *     summary: Получает данные о количестве пользователей в каждый месяц
 *
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       month:
 *                         type: string
 *                         example: 06.2021
 *                       count:
 *                         type: integer
 *                         example: 6
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Данные не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get('/statistic_user/count_in_months', userController.getCountUserInMonth)


module.exports = router;
