import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_YOUTUBE_API_BASE_URL,
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});

export default api;
