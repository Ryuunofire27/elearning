/**
 * Mocking client-server processing
 */
import axios from 'axios';

const _user = true;
const base = 'http://localhost:3000/users'

axios.defaults.baseURL = base;

export default {
  login: ({ email, password }) => {
    return axios.post('/login', {
      email,
      password
    })
  },
  register: (data) => {
    return axios.post('/', data);
  },
  authenticate: (token) => {
    return axios.get('/authenticate', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}