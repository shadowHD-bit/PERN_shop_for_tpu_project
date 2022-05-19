const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');

router.get('/', ordersController.getAllUser)

module.exports = router;