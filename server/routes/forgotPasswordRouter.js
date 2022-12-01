const Router = require('express');
const forgotPasswordController = require('../controllers/forgotPasswordController');
const router = new Router();

router.post('/', forgotPasswordController.getResetPasswordLink)
router.post('/reset_password', forgotPasswordController.resetPassword)
router.post('/check_token', forgotPasswordController.checkToken)

module.exports = router;