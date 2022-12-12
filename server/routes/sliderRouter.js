const Router = require("express");
const router = new Router();
const sliderController = require("../controllers/sliderControllers");
const checkRole = require("../middleware/checkRoleMiddleware");

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
router.post("/", checkRole("ADMIN"), sliderController.createSlider);

/**
 * @openapi
 * '/api/slider/':
 *  get:
 *     tags:
 *     - Slider
 *     summary: Получения списка слайдов
 *
 *     responses:
 *       200:
 *         description: Список слайдов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       img:
 *                         type: string
 *                         example: 08c96c56-c6b7-44ea-ad24-9710e1fbbf6c.jpg
 *                       title:
 *                         type: string
 *                         example: Привет, новый слайд!
 *                       text:
 *                         type: string
 *                         example: Описание слайда...
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Слайды не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get("/", sliderController.getSliders);

/**
 * @openapi
 * '/api/slider/:id':
 *  get:
 *     tags:
 *     - Slider
 *     summary: Получения слайда
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID слайда
 *       schema:
 *         type : integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Параметры слайда
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       img:
 *                         type: string
 *                         example: 08c96c56-c6b7-44ea-ad24-9710e1fbbf6c.jpg
 *                       title:
 *                         type: string
 *                         example: Привет, новый слайд!
 *                       text:
 *                         type: string
 *                         example: Описание слайда...
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Слайд не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get("/:id", sliderController.getOneSlides);

/**
 * @openapi
 * '/api/slider/:id':
 *  delete:
 *     tags:
 *     - Slider
 *     summary: Удаление слайда
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID слайда
 *       schema:
 *         type : integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Слайд удален!
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Слайд не найден!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.delete("/:id", checkRole("ADMIN"), sliderController.deleteSlide);

/**
 * @openapi
 * '/api/slider/:id':
 *  put:
 *     tags:
 *     - Slider
 *     summary: Изменение слайда
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID слайда
 *       schema:
 *         type : integer
 *         example: 5
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
 *               example: Слайд изменен!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.put("/:id", checkRole("ADMIN"), sliderController.updateSlide);

module.exports = router;
