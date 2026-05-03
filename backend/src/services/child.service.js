const childRepository = require('../repositories/child.repository');

const childService = {
  async getChildrenByParent(parentId) {
    return childRepository.findAllByParentId(parentId);
  },

  async getChildById(childId, parentId) {
    const child = await childRepository.findById(childId);

    if (!child) {
      throw new Error('Профиль ребёнка не найден');
    }

    if (child.parentId !== parentId) {
      throw new Error('Доступ запрещён');
    }

    return child;
  },

  async createChild({ name, age, avatar }, parentId) {
    if (!name || !age) {
      throw new Error('Имя и возраст ребёнка обязательны');
    }

    if (age < 3 || age > 12) {
      throw new Error('Возраст ребёнка должен быть от 3 до 12 лет');
    }

    return childRepository.create({ name, age, avatar, parentId });
  },

  async updateChild(childId, data, parentId) {
    await childService.getChildById(childId, parentId);
    return childRepository.update(childId, data);
  },

  async deleteChild(childId, parentId) {
    await childService.getChildById(childId, parentId);
    return childRepository.delete(childId);
  },
};

module.exports = childService;
