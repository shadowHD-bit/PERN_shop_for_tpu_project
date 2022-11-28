const Router = require('express')
const router = new Router()
const badgeController = require('../controllers/badgeController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), badgeController.createBadge)

//Method GET to get product
router.get('/', badgeController.getBadges)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), badgeController.deleteBadge)

module.exports = router