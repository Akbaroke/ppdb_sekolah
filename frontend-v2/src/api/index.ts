import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

// Tambahkan interceptor untuk menambahkan token ke setiap permintaan
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ganti dengan kunci yang sesuai dengan implementasi Anda
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tambahkan interceptor untuk menangani respons 403 (token expired)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Cek apakah respons adalah 403 (token expired)
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Lakukan refresh token dan coba kirim permintaan lagi
      try {
        const newToken = await refreshToken(); // Ganti dengan logika refresh token Anda
        localStorage.setItem('token', newToken); // Update token di local storage
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Jika refresh token gagal, redirect ke halaman login atau lakukan tindakan lainnya
        // Contoh: redirect ke halaman login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Fungsi untuk merefresh token (gantilah dengan implementasi sesuai kebutuhan Anda)
const refreshToken = async () => {
  const { data } = await axios.post(
    import.meta.env.VITE_APP_URL + '/refresh_token',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return data.token;
};

export default api;
