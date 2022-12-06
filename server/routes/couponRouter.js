const Router = require('express')
const router = new Router()
const couponsController = require('../controllers/couponsController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), couponsController.createCoupon)

//Method GET to get product
router.get('/', couponsController.getCoupons)
router.get('/check_coupon/:code', couponsController.getOneCoupon)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), couponsController.deleteCoupon)

module.exports = router