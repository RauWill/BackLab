const { Router } = require('express');
const childController = require('../controllers/child.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.use(authMiddleware);

router.get('/', childController.getAll);
router.get('/:id', childController.getOne);
router.post('/', childController.create);
router.put('/:id', childController.update);
router.delete('/:id', childController.remove);

module.exports = router;
