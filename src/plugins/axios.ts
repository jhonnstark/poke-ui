import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const api = axios.create({ baseURL: 'http://localhost' })

api.defaults.withCredentials = true
api.defaults.withXSRFToken = true

// Add a request interceptor to include UUID in headers
api.interceptors.request.use(config => {
  config.headers['X-Request-ID'] = uuidv4();
  return config;
}, error => {
  return Promise.reject(error);
});

export { api }
