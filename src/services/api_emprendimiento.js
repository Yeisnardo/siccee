import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Crear emprendimiento
const createEmprendimiento = async (emprendimiento) => {
  const response = await api.post('/api/emprendimientos', emprendimiento);
  return response.data;
};

// Obtener emprendimiento por ID
const getEmprendimiento = async (id) => {
  const response = await api.get(`/api/emprendimientos/${id}`);
  return response.data;
};

// Actualizar emprendimiento
const updateEmprendimiento = async (id, emprendimiento) => {
  const response = await api.put(`/api/emprendimientos/${id}`, emprendimiento);
  return response.data;
};

// Eliminar emprendimiento
const deleteEmprendimiento = async (id) => {
  const response = await api.delete(`/api/emprendimientos/${id}`);
  return response.data;
};

export default {
  createEmprendimiento,
  getEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento,
};