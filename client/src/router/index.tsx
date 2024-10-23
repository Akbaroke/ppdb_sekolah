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
import Siswa from '../pages/admin/siswa';
import Pembayaran from '../pages/admin/pembayaran';
import NotFound from '../pages/NotFound';
import RiwayatPembayaranDUSB from '../pages/admin/pembayaran/RiwayatPembayaranDUSB';
import RiwayatPembayaranSPP from '../pages/admin/pembayaran/RiwayatPembayaranSPP';
import DetailBiayaDUSB from '../pages/admin/pembayaran/DetailBiayaDUSB';
import RiwayatPembayaranDUKK from '../pages/admin/pembayaran/RiwayatPembayaranDUKK';
import DetailBiayaDUKK from '../pages/admin/pembayaran/DetailBiayaDUKK';
import ListBiayaDUSB from '../pages/admin/pembayaran/ListBiayaDUSB';
import ListBiayaDUKK from '../pages/admin/pembayaran/ListBiayaDUKK';
import RiwayatPembayaranIjazah from '../pages/admin/pembayaran/RiwayatPembayaranIjazah';
import DetailBiayaIjazah from '../pages/admin/pembayaran/DetailBiayaIjazah';

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
          element: <DetailSiswa />,
        },
        {
          path: '/pembayaran/riwayat-spp',
          element: <RiwayatPembayaranSPP />,
        },
        {
          path: '/pembayaran/riwayat-dusb',
          element: <RiwayatPembayaranDUSB />,
        },
        {
          path: '/pembayaran/detail-dusb',
          element: <DetailBiayaDUSB />,
        },
        {
          path: '/pembayaran/detail-dusb/list',
          element: <ListBiayaDUSB />,
        },
        {
          path: '/pembayaran/riwayat-dukk',
          element: <RiwayatPembayaranDUKK />,
        },
        {
          path: '/pembayaran/detail-dukk',
          element: <DetailBiayaDUKK />,
        },
        {
          path: '/pembayaran/detail-dukk/list',
          element: <ListBiayaDUKK />,
        },
        {
          path: '/pembayaran/riwayat-ijazah',
          element: <RiwayatPembayaranIjazah />,
        },
        {
          path: '/pembayaran/detail-ijazah',
          element: <DetailBiayaIjazah />,
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
