const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');

router.get('/statistic_order/count_in_months', ordersController.getCountOrdersInMonth)
module.exports = router;
