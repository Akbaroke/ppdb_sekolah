import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppShell as MantineAppShell,
  Burger,
  Group,
  ScrollArea,
  Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconUsers,
  IconKey,
  IconLogout,
  IconUserPlus,
  IconCalendarEvent,
  IconSchool,
  IconFriends,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import classes from '../styles/AppShell.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataUser } from '../interfaces/store';
import { ADMIN_PROFILE, LOGO, USER_PROFILE } from '../assets';
import { logout } from '../redux/slices/authSlice';
import { IconListCheck } from '@tabler/icons-react';
import ModalConfirm from '../components/ModalConfirm';
import { Notify } from '../components/Notify';
import { fetchTahunAjaran } from '../redux/slices/tahunAjaranSlice';
import { fetchKelas } from '../redux/slices/kelasSlice';

const dataUser = [
  { link: '/user/siswa-terdaftar', label: 'Siswa Terdaftar', icon: IconUsers },
  {
    link: '/user/daftar-siswa-baru',
    label: 'Daftar Siswa Baru',
    icon: IconUserPlus,
  },
  { link: '/user/ganti-katasandi', label: 'Ganti Kata Sandi', icon: IconKey },
];

const dataAdmin = [
  {
    link: '/admin/tahun-ajaran',
    label: 'Tahun Ajaran',
    icon: IconCalendarEvent,
  },
  { link: '/admin/kelas', label: 'Kelas', icon: IconSchool },
  { link: '/admin/siswa', label: 'Siswa', icon: IconFriends },
  { link: '/admin/pendaftar', label: 'Pendaftar', icon: IconListCheck },
  { link: '/admin/pembayaran', label: 'Pembayaran', icon: IconArrowsLeftRight },
  { link: '/admin/ganti-katasandi', label: 'Ganti Kata Sandi', icon: IconKey },
];

const warnFeatureOnDevelop = [
  '/admin/siswa',
  '/admin/siswa',
  '/admin/pendaftar',
  '/admin/pembayaran',
  '/admin/ganti-katasandi',
  '/user/ganti-katasandi',
  '/user/daftar-siswa-baru',
  '/user/siswa-terdaftar',
];

export function AppShell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, email } = useSelector(
    (state: { auth: DataUser }) => state.auth
  );
  const isAdmin = role === 'admin';
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation().pathname;

  const [active, setActive] = useState(
    isAdmin ? '/admin/tahun-ajaran' : '/user/siswa-terdaftar'
  );
  useEffect(() => {
    const spiter = location.split('/').filter((item) => item !== '');
    const pathLocation =
      spiter.length > 1
        ? `/${spiter[0]}/${spiter[1]}`
        : `/${spiter[0]}/${isAdmin ? 'tahun-ajaran' : 'siswa-terdaftar'}`;
    setActive(pathLocation);
  }, [isAdmin, location]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchTahunAjaran());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchKelas());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const path = useLocation().pathname;
  useEffect(() => {
    if (warnFeatureOnDevelop.includes(path)) {
      Notify(
        'warning',
        'Mohon maaf fitur ini masih dalam tahap pengembangan',
        path
      );
    }
  }, [path]);

  const links = isAdmin
    ? dataAdmin.map((item) => (
        <Link
          className={classes.link}
          data-active={item.link === active || undefined}
          to={item.link}
          key={item.label}
          onClick={() => {
            setActive(item.link);
            toggle();
          }}>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      ))
    : dataUser.map((item) => (
        <Link
          className={classes.link}
          data-active={item.link === active || undefined}
          to={item.link}
          key={item.label}
          onClick={() => {
            setActive(item.link);
            toggle();
          }}>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      ));

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md">
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="Logo" width={35} className="drop-shadow-lg" />
            <h1 className="text-lg font-bold tracking-tight drop-shadow-lg">
              Sekolah Indonesia
            </h1>
          </div>
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Navbar p="md">
        <MantineAppShell.Section>
          <div className="flex flex-col items-center gap-3 p-3 py-5 border-b border-gray-100">
            <img
              src={isAdmin ? ADMIN_PROFILE : USER_PROFILE}
              alt=""
              width={80}
            />
            <div className="text-center">
              <h1 className="font-bold">
                {isAdmin ? 'Admin' : 'Orang Tua/Wali'}
              </h1>
              <p className="text-gray-400 overflow-ellipsis overflow-hidden w-[200px] text-sm">
                {email}
              </p>
            </div>
          </div>
        </MantineAppShell.Section>
        <MantineAppShell.Section grow my="md" component={ScrollArea}>
          {links}
        </MantineAppShell.Section>
        <MantineAppShell.Section className="border-t border-gray-100 pt-3">
          <ModalConfirm
            title="Keluar Akun"
            icon={<IconLogout />}
            type="danger"
            text="Apakah anda yakin ingin keluar ?"
            btnTitle="Ya, Keluar"
            onAction={() => {
              Notify('success', 'Berhasil keluar');
              dispatch(logout());
              navigate('/login', { replace: true });
            }}>
            <div className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Keluar</span>
            </div>
          </ModalConfirm>
        </MantineAppShell.Section>
      </MantineAppShell.Navbar>
      <MantineAppShell.Main className="bg-gray-50">
        <Container size={1200} my={10} p={0}>
          <Outlet />
        </Container>
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
