const lessonService = require('../services/lesson.service');

const lessonController = {
  async getAllUnits(req, res) {
    try {
      const units = await lessonService.getAllUnits();
      res.status(200).json(units);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getLessonById(req, res) {
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await lessonService.getLessonById(lessonId);
      res.status(200).json(lesson);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async completeLesson(req, res) {
    try {
      const lessonId = parseInt(req.params.id);
      const { childId } = req.body;

      if (!childId) {
        return res.status(400).json({ message: 'childId обязателен' });
      }

      const result = await lessonService.completeLesson(lessonId, parseInt(childId));
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getChildProgress(req, res) {
    try {
      const childId = parseInt(req.params.childId);
      const progress = await lessonService.getChildProgress(childId);
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = lessonController;
