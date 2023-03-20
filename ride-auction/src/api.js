import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/', // Replace with the URL where your backend is running
});

export default api;