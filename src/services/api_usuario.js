import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // ajusta si es necesario
});

// Funciones API
const getUsers = async () => {
  const response = await api.get('/api/usuarios');
  return response.data;
};

const createUsuario = async (usuario) => {
  const response = await api.post('/api/usuarios', usuario);
  return response.data;
};

const updateUsuario = async (cedula, usuario) => {
  const response = await api.put(`/api/usuarios/${cedula}`, usuario);
  return response.data;
};

const deleteUsuario = async (cedula) => {
  const response = await api.delete(`/api/usuarios/${cedula}`);
  return response.data;
};

const updateUsuarioEstatus = async (cedula, estatus) => {
  const response = await api.put(`/api/usuarios/${cedula}/estatus`, { estatus });
  return response.data;
};

export default {
  getUsers,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  updateUsuarioEstatus,
};