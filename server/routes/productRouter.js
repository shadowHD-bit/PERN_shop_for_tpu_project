const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

//Method POST to create
router.post('/', productController.createProduct)

//Method GET to get product
router.get('/', productController.getProduct)
router.get('/:id', productController.getOneProduct)


module.exports = router