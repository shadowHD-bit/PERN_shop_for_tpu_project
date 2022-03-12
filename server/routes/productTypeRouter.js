const Router = require('express')
const router = new Router()
const productTypeController = require('../controllers/productTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'),productTypeController.createProductType)

//Method GET to get brands
router.get('/', productTypeController.getProductType)


module.exports = router