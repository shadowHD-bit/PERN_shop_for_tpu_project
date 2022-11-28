const Router = require('express')
const router = new Router()
const productSizeController = require('../controllers/productSizeController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), productSizeController.createSize)

//Method delete product
router.delete('/', checkRole("ADMIN"), productSizeController.deleteSize)

module.exports = router