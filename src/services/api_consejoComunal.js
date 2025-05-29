import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Funciones API para consejo_comunal
const getConsejos = async () => {
  const response = await api.get('/api/consejo_comunal');
  return response.data;
};

const createConsejo = async (consejo) => {
  const response = await api.post('/api/consejo_comunal', consejo);
  return response.data;
};

const updateConsejo = async (id, consejo) => {
  const response = await api.put(`/api/consejo_comunal/${id}`, consejo);
  return response.data;
};

const deleteConsejo = async (id) => {
  const response = await api.delete(`/api/consejo_comunal/${id}`);
  return response.data;
};

export default {
  getConsejos,
  createConsejo,
  updateConsejo,
  deleteConsejo,
};