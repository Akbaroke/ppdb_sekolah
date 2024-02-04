import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import useSessionCheck from '../hooks/useSessionCheck';
import { DataUser } from '../interfaces/store';

type Props = {
  children: React.ReactNode;
};

export default function UserMiddleware({ children }: Props) {
  const location = useLocation();
  const { isLogin, role } = useSelector(
    (state: { auth: DataUser }) => state.auth
  );
  useSessionCheck(isLogin);

  if (!isLogin || role !== 'user') {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return <>{children}</>;
}
