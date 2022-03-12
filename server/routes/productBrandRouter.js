const Router = require('express')
const router = new Router()
const productBrandController = require('../controllers/productBrandController')
const checkRole = require('../middleware/checkRoleMiddleware')


//Method POST to create
router.post('/', checkRole('ADMIN'),productBrandController.createProductBrand)

//Method GET to get brands
router.get('/', productBrandController.getProductBrand)


module.exports = router