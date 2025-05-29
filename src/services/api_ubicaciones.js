import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Funciones API para ubicaciones
const getUbicaciones = async () => {
  const response = await api.get('/api/ubicaciones');
  return response.data;
};

const createUbicacion = async (ubicacion) => {
  const response = await api.post('/api/ubicaciones', ubicacion);
  return response.data;
};

const updateUbicacion = async (id, ubicacion) => {
  const response = await api.put(`/api/ubicaciones/${id}`, ubicacion);
  return response.data;
};

const deleteUbicacion = async (id) => {
  const response = await api.delete(`/api/ubicaciones/${id}`);
  return response.data;
};

export default {
  getUbicaciones,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion,
};