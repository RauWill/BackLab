const childService = require('../services/child.service');

const childController = {
  async getAll(req, res) {
    try {
      const children = await childService.getChildrenByParent(req.user.id);
      res.status(200).json(children);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const childId = parseInt(req.params.id);
      const child = await childService.getChildById(childId, req.user.id);
      res.status(200).json(child);
    } catch (error) {
      const status = error.message === 'Доступ запрещён' ? 403 : 404;
      res.status(status).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const child = await childService.createChild(req.body, req.user.id);
      res.status(201).json(child);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const childId = parseInt(req.params.id);
      const child = await childService.updateChild(childId, req.body, req.user.id);
      res.status(200).json(child);
    } catch (error) {
      const status = error.message === 'Доступ запрещён' ? 403 : 400;
      res.status(status).json({ message: error.message });
    }
  },

  async remove(req, res) {
    try {
      const childId = parseInt(req.params.id);
      await childService.deleteChild(childId, req.user.id);
      res.status(204).send();
    } catch (error) {
      const status = error.message === 'Доступ запрещён' ? 403 : 400;
      res.status(status).json({ message: error.message });
    }
  },
};

module.exports = childController;
