const Router = require('express')
const router = new Router()
const answerController = require('../controllers/answerController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', answerController.createAnswer)

//Method GET to get question
router.get('/:id', answerController.getOneAnswer)
router.put('/', checkRole("ADMIN"),answerController.updateAnswer)

module.exports = router