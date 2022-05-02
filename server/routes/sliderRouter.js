const Router = require('express')
const router = new Router()
const sliderController = require('../controllers/sliderControllers')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), sliderController.createSlider)

//Method GET to get product
router.get('/', sliderController.getSliders)
router.get('/:id', sliderController.getOneSlides)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), sliderController.deleteSlide)
router.put('/:id', checkRole("ADMIN"), sliderController.updateSlide)

module.exports = router