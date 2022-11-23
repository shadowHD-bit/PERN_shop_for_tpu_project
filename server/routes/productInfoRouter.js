const Router = require('express')
const router = new Router()
const productInfoController = require('../controllers/productInfoController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), productInfoController.createProductInfo)

// router.get('/:id', productInfoController.getProductOneInfo)
router.get('/:id', productInfoController.getProductInfo)

router.delete('/:id', checkRole("ADMIN"), productInfoController.deleteInfo)
router.put('/:id', checkRole("ADMIN"), productInfoController.updateProductInfo)

module.exports = router