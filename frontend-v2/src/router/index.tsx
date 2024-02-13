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
import DetailSiswa from '../pages/DetailSiswa';
import Pendaftar from '../pages/admin/Pendaftar';
import DetailPendaftar from '../pages/DetailPendaftar';
import Siswa from '../pages/admin/siswa';
import Pembayaran from '../pages/admin/pembayaran';
import PembayaranSpp from '../pages/admin/pembayaran/PembayaranSpp';
import NotFound from '../pages/NotFound';

export type DataRouteType = {
  path: string;
  element: React.ReactElement;
  middleware?: 'guest' | 'user' | 'admin';
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
        {
          path: '/siswa-terdaftar/:id',
          element: <DetailSiswa />,
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
          element: <Siswa />,
        },
        {
          path: '/pendaftar',
          element: <Pendaftar />,
        },
        {
          path: '/pembayaran',
          element: <Pembayaran />,
        },
        {
          path: '/ganti-katasandi',
          element: <GantiKataSandi />,
        },
        {
          path: '/siswa/:id',
          element: <DetailSiswa />,
        },
        {
          path: '/pendaftar/:id',
          element: <DetailPendaftar />,
        },
        {
          path: '/pembayaran/spp',
          element: <PembayaranSpp />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <Routes>
      {dataRoute.map((route, index) => renderRoute(route, index))}
    </Routes>
  );
}
