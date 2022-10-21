const Router = require('express')
const excelController = require('../../controllers/excelController')
const router = new Router()

//Method GET to get product
router.get('/', excelController.getProductExcel)

module.exports = router