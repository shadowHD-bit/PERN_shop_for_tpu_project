const Router = require('express')
const excelController = require('../../controllers/excelController')
const router = new Router()

//Method GET to get brand
router.get('/', excelController.getBrandExcel)

module.exports = router