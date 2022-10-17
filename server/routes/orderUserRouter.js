const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');

router.get('/', ordersController.getAllUser)
router.get('/', ordersController.getOneUserOrders)
module.exports = router;