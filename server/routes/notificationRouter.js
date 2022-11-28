const Router = require('express')
const router = new Router()
const notificationController = require('../controllers/notificationController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), notificationController.createNotification)

router.get('/:id', notificationController.getNotificationUser)

//Method delete product
router.delete('/:id', notificationController.deleteNotification)

module.exports = router