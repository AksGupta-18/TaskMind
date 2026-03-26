import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await api.get('');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getTasksByStatus: async (status) => {
    try {
      const response = await api.get(`/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks by status:', error);
      throw error;
    }
  },

  getTasksByPriority: async (priority) => {
    try {
      const response = await api.get(`/priority/${priority}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks by priority:', error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const response = await api.post('', task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  markCompleted: async (id) => {
    try {
      const response = await api.patch(`/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error('Error marking task completed:', error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await api.put(`/${id}`, task);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};
