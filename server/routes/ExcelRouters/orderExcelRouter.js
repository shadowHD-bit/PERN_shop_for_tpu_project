const Router = require('express')
const excelController = require('../../controllers/excelController')
const router = new Router()

//Method GET to get order
router.get('/', excelController.getOrderExcel)

module.exports = router