const Router = require('express');
const router = new Router();
const LikesController = require('../controllers/likesController');
const authMiddleware = require('../middleware/auth.Middleware');
const checkDeleteProductFromLikes = require('../middleware/checkDeleteProductFromLikes');


router.post('/', authMiddleware, LikesController.addProducts)
router.get('/', authMiddleware, LikesController.getProducts)
router.delete('/:id', authMiddleware, checkDeleteProductFromLikes, LikesController.deleteProduct);

module.exports = router;