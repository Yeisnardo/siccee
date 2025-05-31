import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Crear ubicación
const createUbicacion = async (ubicacion) => {
  const response = await api.post('/api/ubicaciones', ubicacion);
  return response.data;
};

// Obtener ubicación por ID
const getUbicacion = async (id) => {
  const response = await api.get(`/api/ubicaciones/${id}`);
  return response.data;
};

// Actualizar ubicación
const updateUbicacion = async (id, ubicacion) => {
  const response = await api.put(`/api/ubicaciones/${id}`, ubicacion);
  return response.data;
};

// Eliminar ubicación
const deleteUbicacion = async (id) => {
  const response = await api.delete(`/api/ubicaciones/${id}`);
  return response.data;
};

export default {
  createUbicacion,
  getUbicacion,
  updateUbicacion,
  deleteUbicacion,
};