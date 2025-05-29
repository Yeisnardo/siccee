import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Ajusta la URL si es diferente
});

// Funciones API para emprendimientos
const getEmprendimientos = async () => {
  const response = await api.get('/api/emprendimientos');
  return response.data;
};

const createEmprendimiento = async (emprendimiento) => {
  const response = await api.post('/api/emprendimientos', emprendimiento);
  return response.data;
};

const updateEmprendimiento = async (id, emprendimiento) => {
  const response = await api.put(`/api/emprendimientos/${id}`, emprendimiento);
  return response.data;
};

const deleteEmprendimiento = async (id) => {
  const response = await api.delete(`/api/emprendimientos/${id}`);
  return response.data;
};

export default {
  getEmprendimientos,
  createEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento,
};