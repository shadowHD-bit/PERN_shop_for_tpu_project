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
router.put('/:id', checkRole("ADMIN"), productController.update)

//Method Search
router.get('/search', productController.getSearchAllProductByName) //api/product/search?page=${page}&name=${name}&filter=${filter}

module.exports = router