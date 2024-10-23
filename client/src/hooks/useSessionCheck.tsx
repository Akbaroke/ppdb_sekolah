import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import validateToken from '../services/validateToken';
import { login, logout } from '../redux/slices/authSlice';

const useSessionCheck = (isLogin: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');

      if (token && !isLogin) {
        try {
          const res = await validateToken(token);
          dispatch(login({ ...res, token }));
        } catch (error) {
          console.log(error);
          dispatch(logout());
        }
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, validateToken]);

  return null;
};

export default useSessionCheck;
