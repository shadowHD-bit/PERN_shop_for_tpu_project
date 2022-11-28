const Router = require('express')
const router = new Router()
const rulesController = require('../controllers/rulesController')
const checkRole = require('../middleware/checkRoleMiddleware')

//Method POST to create
router.post('/', checkRole('ADMIN'), rulesController.createRules)

//Method GET to get product
router.get('/', rulesController.getRules)
router.get('/:id', rulesController.getOneRules)

//Method delete product
router.delete('/:id', checkRole("ADMIN"), rulesController.deleteRules)
router.put('/', checkRole("ADMIN"),rulesController.updateRules)

module.exports = router