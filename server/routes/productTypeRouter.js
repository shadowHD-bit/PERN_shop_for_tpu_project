const Router = require('express')
const router = new Router()
const productTypeController = require('../controllers/productTypeController')

//Method POST to create
router.post('/', productTypeController.createProductType)

//Method GET to get brands
router.get('/', productTypeController.getProductType)


module.exports = router