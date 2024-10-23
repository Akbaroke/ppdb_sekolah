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
  const isAdmin = role === 'admin';

  const form = useLocation()?.state?.from;
  const spiter = form?.pathname
    ?.split('/')
    .filter((item: string) => item !== '');

  const rootPath = spiter
    ? spiter[0] === role
      ? form?.pathname + form?.search
      : `${role}`
    : isAdmin
    ? '/admin'
    : '/user';

  // const from =
  //   `${location?.pathname}${location?.search}` ??
  //   (role === 'admin' ? '/admin' : '/user');
  // const from = isAdmin ? '/admin' : '/user';

  useSessionCheck(isLogin);

  if (isLogin) {
    return <Navigate to={rootPath} replace={true} />;
  }

  return <>{children}</>;
}
31;