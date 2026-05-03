import api from '../../services/api';

const lessonService = {
  async getAllUnits() {
    const response = await api.get('/lessons');
    return response.data;
  },

  async getLessonById(id) {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  async completeLesson(lessonId, childId) {
    const response = await api.post(`/lessons/${lessonId}/complete`, { childId });
    return response.data;
  },

  async getChildProgress(childId) {
    const response = await api.get(`/lessons/progress/${childId}`);
    return response.data;
  },
};

export default lessonService;
