const Router = require('express')
const excelController = require('../../controllers/excelController')
const router = new Router()

//Method GET to get types
router.get('/', excelController.getTypeExcel)

module.exports = router