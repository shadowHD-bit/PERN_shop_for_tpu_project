const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', reviewController.createReview)
router.get('/:id', reviewController.getReviewOneProduct)
module.exports = router