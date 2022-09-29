const Router = require('express')
const router = new Router()
const ProductDescriptionController = require('../controllers/ProductDescriptionController')
const checkRole = require('../middleware/checkRoleMiddleware')


//Method POST to create
router.post('/', checkRole('ADMIN'),ProductDescriptionController.createDescription)

//Method GET to get description
router.get('/:id', ProductDescriptionController.getOneDescription)
router.get('/', ProductDescriptionController.getDescription)

router.update('/:id', checkRole('ADMIN'),ProductDescriptionController.updateDescription)

router.delete('/:id', checkRole('ADMIN'), ProductDescriptionController.deleteDescription)


module.exports = router