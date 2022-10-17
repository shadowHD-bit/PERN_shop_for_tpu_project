const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', questionController.createQuestion)

//Method GET to get question
router.get('/', questionController.getQuestions)
router.get('/:id', questionController.getQuestionOneProduct)

router.put('/', checkRole("ADMIN"), questionController.updateStatusQuestion)

//Method delete question
router.delete('/:id', checkRole("ADMIN"), questionController.deleteQuestion)

module.exports = router