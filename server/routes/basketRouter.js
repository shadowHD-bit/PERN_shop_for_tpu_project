const Router = require('express');
const router = new Router();
const BasketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/auth.Middleware');
const checkDeleteProductFromBasket = require('../middleware/checkDeleteProductFromBasket');


router.post('/', authMiddleware, BasketController.addProducts)
router.get('/', authMiddleware, BasketController.getProducts)
router.delete('/:id', authMiddleware, checkDeleteProductFromBasket, BasketController.deleteProduct);

module.exports = router;