const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth.Middleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

/**
 * @openapi
 * '/api/user/registration':
 *  post:
 *     tags:
 *     - User
 *     summary: Регистрация пользователя
 *     parameters:
 *     - name: email
 *       in: query
 *       required: true
 *       description: Электронная почта пользователя
 *       schema:
 *         type : string
 *         example: example@example.com
 *
 *     - name: password
 *       in: query
 *       required: true
 *       description: Пароль пользователя
 *       schema:
 *         type : string
 *         example: examplepassword12345
 *
 *     - name: name
 *       in: query
 *       required: true
 *       description: Имя пользователя
 *       schema:
 *         type : string
 *         example: Иван
 *
 *     - name: family
 *       in: query
 *       required: true
 *       description: Фамилия пользователя
 *       schema:
 *         type : string
 *         example: Иванов
 *
 *     - name: data_birthday
 *       in: query
 *       required: true
 *       description: Дата рождения пользователя
 *       schema:
 *         type : string
 *         example: 02.02.1999
 *
 *     - name: numberPhone
 *       in: query
 *       required: true
 *       description: Номер телефона пользователя
 *       schema:
 *         type : string
 *         example: 88008002526
 *
 *     - name: gender
 *       in: query
 *       required: true
 *       description: Пол
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: allowSpam
 *       in: query
 *       required: true
 *       description: Доступ к рассылке
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: role
 *       in: query
 *       required: true
 *       description: Роль пользователя
 *       schema:
 *         type : string
 *         example: USER
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9.QEm7CXwf_0Fmm0HwdgRz9uVkUjx5FZH17A6J6rdfYTI
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Такой пользователь зарегистрирован!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.post("/registration", userController.registration);

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Авторизация пользователя
 *     parameters:
 *     - name: email
 *       in: query
 *       required: true
 *       description: Электронная почта пользователя
 *       schema:
 *         type : string
 *         example: example@example.com
 *
 *     - name: password
 *       in: query
 *       required: true
 *       description: Пароль пользователя
 *       schema:
 *         type : string
 *         example: examplepassword12345
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9.QEm7CXwf_0Fmm0HwdgRz9uVkUjx5FZH17A6J6rdfYTI
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Такой пользователь не найден!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.post("/login", userController.login);

/**
 * @openapi
 * '/api/user/auth':
 *  get:
 *     tags:
 *     - User
 *     summary: Проврка авторизации пользователя
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9.QEm7CXwf_0Fmm0HwdgRz9uVkUjx5FZH17A6J6rdfYTI
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Такой пользователь не авторизован!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get("/auth", authMiddleware, userController.checkAuth);

/**
 * @openapi
 * '/api/user/admin_user':
 *  get:
 *     tags:
 *     - User
 *     summary: Получения списка администраторов
 *
 *     responses:
 *       200:
 *         description: Список администраторов
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
 *                       name:
 *                         type: string
 *                         example: Admin
 *                       family:
 *                         type: string
 *                         example: Admin
 *                       email:
 *                         type: string
 *                         example: admin@admin.com
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Пользователи не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get(
  "/admin_user",
  checkRoleMiddleware("ADMIN"),
  userController.getUsersRoleAdmin
);

/**
 * @openapi
 * '/api/user/new_user':
 *  get:
 *     tags:
 *     - User
 *     summary: Получения списка новых пользователей
 *
 *     responses:
 *       200:
 *         description: Список новых пользователей
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
 *                       name:
 *                         type: string
 *                         example: Иван
 *                       family:
 *                         type: string
 *                         example: Иванов
 *                       email:
 *                         type: string
 *                         example: ivanov@gmail.com
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Пользователи не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get(
  "/new_user",
  checkRoleMiddleware("ADMIN"),
  userController.getNewUser
);

/**
 * @openapi
 * '/api/user/money_user':
 *  get:
 *     tags:
 *     - User
 *     summary: Получения списка пользователей, которые совершили больше всего покупок
 *
 *     responses:
 *       200:
 *         description: Список пользователей
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
 *                       name:
 *                         type: string
 *                         example: Иван
 *                       family:
 *                         type: string
 *                         example: Иванов
 *                       email:
 *                         type: string
 *                         example: ivanov@gmail.com
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Пользователи не найдены!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get(
  "/money_user",
  checkRoleMiddleware("ADMIN"),
  userController.getMoneyUser
);

/**
 * @openapi
 * '/api/user/:id':
 *  get:
 *     tags:
 *     - User
 *     summary: Получает данные одного пользователя
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID пользователя
 *       schema:
 *         type : integer
 *         example: 4
 *     responses:
 *       200:
 *         description: Список пользователей
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
 *                         example: 4
 *                       name:
 *                         type: string
 *                         example: Иван
 *                       family:
 *                         type: string
 *                         example: Иванов
 *                       email:
 *                         type: string
 *                         example: ivanov@gmail.com
 *                       numberPhone:
 *                         type: string
 *                         example: 88005663478
 *                       dataBirthday:
 *                         type: string
 *                         example: 02.02.2000
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Такой пользователь не найден!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get("/:id", authMiddleware, userController.getDataUser);

/**
 * @openapi
 * '/api/user':
 *  get:
 *     tags:
 *     - User
 *     summary: Получает данные всех пользователей
 *
 *     responses:
 *       200:
 *         description: Список пользователей
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
 *                         example: 4
 *                       name:
 *                         type: string
 *                         example: Иван
 *                       family:
 *                         type: string
 *                         example: Иванов
 *                       email:
 *                         type: string
 *                         example: ivanov@gmail.com
 *                       numberPhone:
 *                         type: string
 *                         example: 88005663478
 *                       dataBirthday:
 *                         type: string
 *                         example: 02.02.2000
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Такой пользователь не найден!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * @openapi
 * '/api/user/:id':
 *  put:
 *     tags:
 *     - User
 *     summary: Обновление данных пользователя
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID пользователя
 *       schema:
 *         type : integer
 *         example: 4
 *     - name: email
 *       in: query
 *       required: false
 *       description: Электронная почта пользователя
 *       schema:
 *         type : string
 *         example: example@example.com
 *
 *     - name: password
 *       in: query
 *       required: false
 *       description: Пароль пользователя
 *       schema:
 *         type : string
 *         example: examplepassword12345
 *
 *     - name: name
 *       in: query
 *       required: false
 *       description: Имя пользователя
 *       schema:
 *         type : string
 *         example: Иван
 *
 *     - name: family
 *       in: query
 *       required: false
 *       description: Фамилия пользователя
 *       schema:
 *         type : string
 *         example: Иванов
 *
 *     - name: data_birthday
 *       in: query
 *       required: false
 *       description: Дата рождения пользователя
 *       schema:
 *         type : string
 *         example: 02.02.1999
 *
 *     - name: numberPhone
 *       in: query
 *       required: false
 *       description: Номер телефона пользователя
 *       schema:
 *         type : string
 *         example: 88008002526
 *
 *     - name: gender
 *       in: query
 *       required: false
 *       description: Пол
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: allowSpam
 *       in: query
 *       required: false
 *       description: Доступ к рассылке
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: role
 *       in: query
 *       required: false
 *       description: Роль пользователя
 *       schema:
 *         type : string
 *         example: USER
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Данные пользователя обновлены!
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Такой пользователь зарегистрирован!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Ощибка сервера!
 */
router.put("/:id", userController.updateUserData);

module.exports = router;
