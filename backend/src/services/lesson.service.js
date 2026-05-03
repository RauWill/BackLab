const lessonRepository = require('../repositories/lesson.repository');
const childRepository = require('../repositories/child.repository');

const lessonService = {
  async getAllUnits() {
    return lessonRepository.findAllUnitsWithLessons();
  },

  async getLessonById(lessonId) {
    const lesson = await lessonRepository.findLessonById(lessonId);
    if (!lesson) {
      throw new Error('Урок не найден');
    }
    return lesson;
  },

  async completeLesson(lessonId, childId) {
    const lesson = await lessonRepository.findLessonById(lessonId);
    if (!lesson) {
      throw new Error('Урок не найден');
    }

    const existingProgress = await lessonRepository.findProgress(childId, lessonId);
    if (existingProgress) {
      throw new Error('Этот урок уже был пройден');
    }

    const xpEarned = lesson.xpReward;

    const [progressRecord] = await Promise.all([
      lessonRepository.createProgress({ childId, lessonId, xpEarned }),
      childRepository.addXp(childId, xpEarned),
    ]);

    return {
      message: 'Урок успешно завершён!',
      xpEarned,
      progressRecord,
    };
  },

  async getChildProgress(childId) {
    return lessonRepository.findAllProgressByChildId(childId);
  },
};

module.exports = lessonService;
