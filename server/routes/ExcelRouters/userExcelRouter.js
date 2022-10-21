const Router = require('express')
const excelController = require('../../controllers/excelController')
const router = new Router()

//Method GET to get users
router.get('/', excelController.getUsersExcel)

module.exports = router