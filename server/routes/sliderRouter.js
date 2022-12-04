const Router = require('express')
const router = new Router()
const sliderController = require('../controllers/sliderControllers')
const checkRole = require('../middleware/checkRoleMiddleware')

/**
 * @openapi
 * '/api/slider':
 *  post:
 *     tags:
 *     - Slider
 *     summary: Создание слайда
 *     parameters:
 *     - name: title
 *       in: query
 *       required: true
 *       description: Заголовок слайда
 *       schema:
 *         type : string
 *         example: Новые товары
 *
 *     - name: text
 *       in: query
 *       required: true
 *       description: Текст слайда
 *       schema:
 *         type : string
 *         example: Новые товары уже на странице!
 *
 *     - name: img
 *       in: query
 *       required: true
 *       description: Изображение слайда
 *       schema:
 *         type : file
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Слайд создан!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.post('/', checkRole('ADMIN'), sliderController.createSlider)

//Method GET to get product
router.get('/', sliderController.getSliders)
router.get('/:id', sliderController.getOneSlides)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), sliderController.deleteSlide)
router.put('/:id', checkRole("ADMIN"), sliderController.updateSlide)

module.exports = router