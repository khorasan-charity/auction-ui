import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const app = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// app.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalConfig = err.config;
//     const token = await getCookie<string>("refreshToken");
//     if (err?.response?.status === 401 && !originalConfig._retry) {
//       originalConfig._retry = true;
//       try {
//         const data = await tryRefreshToken(token);
//         if (data) return app(originalConfig);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
