import { Routes } from 'react-router';
import renderRoute from './renderRoute';
import LandingPage from '../pages/LandingPage';
import Forgot from '../pages/auth/Forgot';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import VerifyOtp from '../pages/auth/VerifyOtp';
import { AppShell } from '../layouts/AppShell';
import SiswaTerdaftar from '../pages/user/SiswaTerdaftar';
import DaftarSiswaBaru from '../pages/user/DaftarSiswaBaru';
import GantiKataSandi from '../pages/GantiKataSandi';
import TahunAjaran from '../pages/admin/TahunAjaran';
import Kelas from '../pages/admin/Kelas';
export type DataRouteType = {
  path: string;
  element: React.ReactElement;
  middleware: 'guest' | 'user' | 'admin';
  defaultElement?: React.ReactElement;
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
      element: <AppShell />,
      middleware: 'user',
      defaultElement: <SiswaTerdaftar />,
      withChildren: [
        {
          path: '/siswa-terdaftar',
          element: <SiswaTerdaftar />,
        },
        {
          path: '/daftar-siswa-baru',
          element: <DaftarSiswaBaru />,
        },
        {
          path: '/ganti-katasandi',
          element: <GantiKataSandi />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AppShell />,
      middleware: 'admin',
      defaultElement: <TahunAjaran />,
      withChildren: [
        {
          path: '/tahun-ajaran',
          element: <TahunAjaran />,
        },
        {
          path: '/kelas',
          element: <Kelas />,
        },
        {
          path: '/siswa',
          element: <h1>siswa</h1>,
        },
        {
          path: '/pendaftar',
          element: <h1>pendaftar</h1>,
        },
        {
          path: '/pembayaran',
          element: <h1>pembayaran</h1>,
        },
        {
          path: '/ganti-katasandi',
          element: <GantiKataSandi />,
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
