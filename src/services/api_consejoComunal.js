import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Crear consejo comunal
const createConsejo = async (consejo) => {
  const response = await api.post('/api/consejo_comunal', consejo);
  return response.data;
};

// Obtener consejo por ID
const getConsejo = async (id) => {
  const response = await api.get(`/api/consejo_comunal/${id}`);
  return response.data;
};

// Actualizar consejo
const updateConsejo = async (id, consejo) => {
  const response = await api.put(`/api/consejo_comunal/${id}`, consejo);
  return response.data;
};

// Eliminar consejo
const deleteConsejo = async (id) => {
  const response = await api.delete(`/api/consejo_comunal/${id}`);
  return response.data;
};

export default {
  createConsejo,
  getConsejo,
  updateConsejo,
  deleteConsejo,
};