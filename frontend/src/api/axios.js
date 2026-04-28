import axios from "axios";

const api = axios.create({
 baseURL:
   "https://custome-management-backend.onrender.com",
 // or http://localhost:5000 for local

 headers:{
   "Content-Type":"application/json"
 },
 timeout:10000
});


/* optional response interceptor */
api.interceptors.response.use(
 response => response,
 error => {
   console.error(
    error.response?.data ||
    error.message
   );

   return Promise.reject(error);
 }
);

export default api;