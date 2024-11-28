import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7098/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.status === 401) {
          localStorage.removeItem('user');
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);;
  

export default apiClient;