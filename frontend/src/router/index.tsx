import { Route, Routes } from 'react-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Forgot from '../pages/Forgot';
import VerifyOtp from '../pages/VerifyOtp';
import ResetPassword from '../pages/ResetPassword';
type DataRouteType = {
  path: string;
  element: React.ReactElement;
  middleware: 'guest' | 'user';
};

export default function Root() {
  const dataRoute: DataRouteType[] = [
    {
      path: '/login',
      element: <Login />,
      middleware: 'guest',
    },
    {
      path: '/register',
      element: <Register />,
      middleware: 'guest',
    },
    {
      path: '/forgot',
      element: <Forgot />,
      middleware: 'guest',
    },
    {
      path: '/otp',
      element: <VerifyOtp />,
      middleware: 'guest',
    },
    {
      path: '/reset_password',
      element: <ResetPassword />,
      middleware: 'guest',
    },
  ];

  return (
    <Routes>
      {dataRoute.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
