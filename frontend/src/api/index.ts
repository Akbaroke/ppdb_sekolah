import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

api.interceptors.request.use(
  (config) => {
    // Ambil token akses dari tempat penyimpanan Anda (misalnya, state atau cookie)
    const accessToken = void getAccessToken();

    if (accessToken) {
      // Setel token akses dalam header Authorization
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Membuat variabel untuk menyimpan apakah sedang melakukan refresh token
let isRefreshing = false;

// Membuat array untuk menyimpan permintaan yang tertunda
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshQueue: any[] = [];

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Tangani hanya jika respons dari server menunjukkan bahwa token akses tidak valid
    if (error.response.status === 500 && !originalRequest._retry) {
      if (isRefreshing) {
        // Jika sedang melakukan refresh token, masukkan permintaan ke dalam antrian
        return new Promise((resolve) => {
          refreshQueue.push(() => {
            originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Lakukan refresh token
        const newAccessToken = await refreshAccessToken();

        // Setel ulang token akses dalam header permintaan
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Jalankan semua permintaan yang tertunda dengan token yang diperbarui
        refreshQueue.forEach((resolveRequest) => resolveRequest());
        refreshQueue = [];
        return api(originalRequest);
      } catch (refreshError) {
        // Handle error saat refresh token
        console.error('Error :', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Fungsi untuk mendapatkan token akses dari tempat penyimpanan Anda
function getAccessToken() {
  return localStorage.getItem('token');
}

// Fungsi untuk melakukan refresh token
async function refreshAccessToken() {
  console.log(getAccessToken());
  try {
    const response: { token: string } = await api.post('/refresh_token', {
      accessToken: getAccessToken(),
    });
    console.log(response);

    const newAccessToken = response.token;
    return newAccessToken;
  } catch (error) {
    console.error('Gagal menyegarkan token:', error);
    // Lakukan tindakan tertentu, misalnya, redirect ke halaman login
    throw error;
  }
}

export default api;
