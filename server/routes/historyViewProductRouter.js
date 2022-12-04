const Router = require('express');
const historyViewProductController = require('../controllers/historyViewProductController');
const router = new Router();

router.post('/', historyViewProductController.addInHistory)
router.get('/:id', historyViewProductController.getHistory)

module.exports = router;