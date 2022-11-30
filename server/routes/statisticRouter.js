const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();

const ordersController = require('./../controllers/ordersController');

router.get('/statistic_order/count_in_months', ordersController.getCountOrdersInMonth)
router.get('/statistic_user/count_in_months', userController.getCountUserInMonth)


module.exports = router;
