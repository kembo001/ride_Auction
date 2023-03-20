import axios from 'axios';

const api = axios.create({
  baseURL: 'http://159.65.178.65/', // Replace with the URL where your backend is running
});

export default api;