const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), productController.createProduct)

//Method GET to get product
router.get('/', productController.getProduct)
router.get('/:id', productController.getOneProduct)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), productController.deleteProduct)

module.exports = router