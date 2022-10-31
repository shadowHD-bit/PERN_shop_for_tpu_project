const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth.Middleware');

router.put('/', authMiddleware, productController.updateDisplay)

module.exports = router;