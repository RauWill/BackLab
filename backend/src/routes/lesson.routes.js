const { Router } = require('express');
const lessonController = require('../controllers/lesson.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.use(authMiddleware);

router.get('/', lessonController.getAllUnits);
router.get('/progress/:childId', lessonController.getChildProgress);
router.get('/:id', lessonController.getLessonById);
router.post('/:id/complete', lessonController.completeLesson);

module.exports = router;
