const prisma = require('../config/prisma');

const userRepository = {
  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async create({ email, password, role }) {
    return prisma.user.create({
      data: { email, password, role },
    });
  },
};

module.exports = userRepository;
