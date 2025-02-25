import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL du backend
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajoute le token JWT
  },
});

export default api;