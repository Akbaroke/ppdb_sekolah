import api from '../api';

export default async function validateToken(token: string) {
  const { data } = await api.post('/me', {
    token,
  });
  return data;
}
