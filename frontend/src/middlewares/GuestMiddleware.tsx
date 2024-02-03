import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import useSessionCheck from '../hooks/useSessionCheck';
import { DataUser } from '../interfaces/store';

type Props = {
  children: React.ReactNode;
};

export default function GuestMiddleware({ children }: Props) {
  const { isLogin, role } = useSelector(
    (state: { auth: DataUser }) => state.auth
  );
  const location = useLocation();
  const from =
    location?.state?.from?.pathname || (role === 'admin' ? '/admin' : '/user');
  useSessionCheck(isLogin);

  if (isLogin) {
    return <Navigate to={from} replace={true} />;
  }

  return <>{children}</>;
}
