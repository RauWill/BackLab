const prisma = require('../config/prisma');

const lessonRepository = {
  async findAllUnitsWithLessons() {
    return prisma.unit.findMany({
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
      },
    });
  },

  async findLessonById(id) {
    return prisma.lesson.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { order: 'asc' },
        },
      },
    });
  },

  async findProgress(childId, lessonId) {
    return prisma.progressRecord.findUnique({
      where: {
        childId_lessonId: { childId, lessonId },
      },
    });
  },

  async createProgress({ childId, lessonId, xpEarned }) {
    return prisma.progressRecord.create({
      data: { childId, lessonId, xpEarned },
    });
  },

  async findAllProgressByChildId(childId) {
    return prisma.progressRecord.findMany({
      where: { childId },
      include: {
        lesson: true,
      },
    });
  },
};

module.exports = lessonRepository;
