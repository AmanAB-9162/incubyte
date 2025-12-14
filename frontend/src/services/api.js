// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   register: (username, password) => 
//     api.post('/auth/register', { username, password }),
  
//   login: (username, password) => 
//     api.post('/auth/login', { username, password })
// };

// // Sweets API
// export const sweetsAPI = {
//   getAll: () => api.get('/sweets'),
  
//   search: (params) => api.get('/sweets/search', { params }),
  
//   add: (sweetData) => api.post('/sweets', sweetData),
  
//   update: (id, sweetData) => api.put(`/sweets/${id}`, sweetData),
  
//   delete: (id) => api.delete(`/sweets/${id}`),
  
//   purchase: (id) => api.post(`/sweets/${id}/purchase`),
  
//   restock: (id, amount) => api.post(`/sweets/${id}/restock`, { amount })
// };

// // Auth helper functions
// export const auth = {
//   setToken: (token) => localStorage.setItem('token', token),
  
//   getToken: () => localStorage.getItem('token'),
  
//   removeToken: () => localStorage.removeItem('token'),
  
//   setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  
//   getUser: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },
  
//   removeUser: () => localStorage.removeItem('user'),
  
//   isAuthenticated: () => !!localStorage.getItem('token'),
  
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }
// };

// export default api;

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (username, password) => 
    api.post('/auth/register', { username, password }),
  
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  
  // NEW: Admin APIs
  registerAdmin: (username, password, adminSecret) => 
    api.post('/auth/admin/register', { username, password, adminSecret }),
  
  loginAdmin: (username, password) => 
    api.post('/auth/admin/login', { username, password })
};

// Sweets API (unchanged)
export const sweetsAPI = {
  getAll: () => api.get('/sweets'),
  search: (params) => api.get('/sweets/search', { params }),
  add: (sweetData) => api.post('/sweets', sweetData),
  update: (id, sweetData) => api.put(`/sweets/${id}`, sweetData),
  delete: (id) => api.delete(`/sweets/${id}`),
  purchase: (id) => api.post(`/sweets/${id}/purchase`),
  restock: (id, amount) => api.post(`/sweets/${id}/restock`, { amount })
};

// Auth helpers (unchanged)
export const auth = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  removeToken: () => localStorage.removeItem('token'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),
  isAuthenticated: () => !!localStorage.getItem('token'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;