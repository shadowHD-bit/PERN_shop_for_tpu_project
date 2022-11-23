const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')

router.post('/user_check_question', questionController.getBoolQuestionOneUserNotComplete)

module.exports = router