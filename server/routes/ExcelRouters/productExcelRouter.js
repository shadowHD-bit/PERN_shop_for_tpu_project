const Router = require('express')
const excelController = require('../../controllers/excelController')
const productController = require('../../controllers/productController')

const router = new Router()

//Method GET to get product
router.get('/', excelController.getProductExcel)
router.post('/', productController.createMoreProduct)

module.exports = router