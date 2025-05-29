import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Funciones API para emprendedores
const getEmprendedores = async () => {
  const response = await api.get('/api/emprendedores');
  return response.data;
};

const createEmprendedor = async (emprendedor) => {
  const response = await api.post('/api/emprendedores', emprendedor);
  return response.data;
};

const updateEmprendedor = async (id, emprendedor) => {
  const response = await api.put(`/api/emprendedores/${id}`, emprendedor);
  return response.data;
};

const deleteEmprendedor = async (id) => {
  const response = await api.delete(`/api/emprendedores/${id}`);
  return response.data;
};

export default {
  getEmprendedores,
  createEmprendedor,
  updateEmprendedor,
  deleteEmprendedor,
};