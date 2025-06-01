import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Crear una nueva persona
const createPersona = async (persona) => {
  const response = await api.post('/api/persona', persona);
  return response.data;
};

// Obtener una persona por ID
const getPersona = async (id) => {
  const response = await api.get(`/api/persona/${id}`);
  return response.data;
};

// Actualizar una persona por ID
const updatePersona = async (id, persona) => {
  const response = await api.put(`/api/persona/${id}`, persona);
  return response.data;
};

// Eliminar una persona por ID
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