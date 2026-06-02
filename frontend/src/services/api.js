import axios from "axios";

const api = axios.create({
baseURL: "https://socialsphere-backend-4vqp.onrender.com/api",
});

export default api;