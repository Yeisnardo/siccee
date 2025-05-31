import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Crear persona
const createPersona = async (persona) => {
  const response = await api.post('/api/persona', persona);
  return response.data;
};

// Obtener persona por ID
const getPersona = async (id) => {
  const response = await api.get(`/api/persona/${id}`);
  return response.data;
};

// Actualizar persona
const updatePersona = async (id, persona) => {
  const response = await api.put(`/api/persona/${id}`, persona);
  return response.data;
};

// Eliminar persona
const deletePersona = async (id) => {
  const response = await api.delete(`/api/persona/${id}`);
  return response.data;
};

export default {
  createPersona,
  getPersona,
  updatePersona,
  deletePersona,
};