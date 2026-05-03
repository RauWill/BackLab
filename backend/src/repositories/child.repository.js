const prisma = require('../config/prisma');

const childRepository = {
  async findAllByParentId(parentId) {
    return prisma.childProfile.findMany({
      where: { parentId },
      orderBy: { createdAt: 'asc' },
    });
  },

  async findById(id) {
    return prisma.childProfile.findUnique({
      where: { id },
    });
  },

  async create({ name, age, avatar, parentId }) {
    return prisma.childProfile.create({
      data: { name, age, avatar, parentId },
    });
  },

  async update(id, { name, age, avatar }) {
    return prisma.childProfile.update({
      where: { id },
      data: { name, age, avatar },
    });
  },

  async delete(id) {
    return prisma.childProfile.delete({
      where: { id },
    });
  },

  async addXp(id, xpAmount) {
    return prisma.childProfile.update({
      where: { id },
      data: {
        totalXp: { increment: xpAmount },
      },
    });
  },
};

module.exports = childRepository;
