import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useSessionCheck from '../hooks/useSessionCheck';
import { DataUser } from '../interfaces/store';

type Props = {
  children: React.ReactNode;
};

export default function GuestMiddleware({ children }: Props) {
  const { isLogin, role } = useSelector(
    (state: { auth: DataUser }) => state.auth
  );
  // const location = useLocation();
  // const from =
  //   location?.state?.from?.pathname ?? (role === 'guru' ? '/admin' : '/user');
  const from = role === 'admin' ? '/admin' : '/user';
  console.log(from);

  useSessionCheck(isLogin);

  if (isLogin) {
    return <Navigate to={from} replace={true} />;
  }

  return <>{children}</>;
}
31;