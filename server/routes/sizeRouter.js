const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/sizeController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), sizeController.createSize)

//Method GET to get product
router.get('/', sizeController.getSizes)
router.get('/:id', sizeController.getSizeOneProduct)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), sizeController.deleteSize)

module.exports = router