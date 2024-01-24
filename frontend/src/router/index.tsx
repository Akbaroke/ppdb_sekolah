import { Routes } from 'react-router';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Forgot from '../pages/Forgot';
import VerifyOtp from '../pages/VerifyOtp';
import DaftarSiswa from '../pages/DaftarSiswa';
import LandingPage from '../pages/LandingPage';
import UserLayout from '../layouts/UserLayout';
import renderRoute from './renderRoute';
import ResetPassword from '../pages/ResetPassword';
import FormulirPendaftaran from '../pages/FormulirPendaftaran';
export type DataRouteType = {
  path: string;
  element: React.ReactElement;
  middleware: 'guest' | 'user' | 'admin';
  withChildren?: OutletChildrenType[];
};

export type OutletChildrenType = {
  path: string;
  element: React.ReactElement;
};

export default function Root() {
  const dataRoute: DataRouteType[] = [
    {
      path: '/',
      element: <LandingPage />,
      middleware: 'guest',
    },
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
      path: '/user',
      element: <UserLayout />,
      middleware: 'user',
      withChildren: [
        {
          path: '/',
          element: <DaftarSiswa />,
        },
        {
          path: '/daftar-siswa',
          element: <DaftarSiswa />,
        },
        {
          path: '/daftar-siswa/formulir-pendaftaran',
          element: <FormulirPendaftaran />,
        },
        {
          path: '/reset-password',
          element: <ResetPassword />,
        },
      ],
    },
  ];

  return (
    <Routes>
      {dataRoute.map((route, index) => renderRoute(route, index))}
    </Routes>
  );
}
