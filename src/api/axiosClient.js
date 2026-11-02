import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 60000, // Thêm timeout 60s cho Render Free Server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;