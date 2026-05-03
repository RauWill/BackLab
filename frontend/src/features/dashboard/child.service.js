import api from '../../services/api';

const childService = {
  async getAll() {
    const response = await api.get('/children');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/children/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await api.post('/children', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/children/${id}`, data);
    return response.data;
  },

  async remove(id) {
    await api.delete(`/children/${id}`);
  },
};

export default childService;
