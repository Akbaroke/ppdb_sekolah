import { LinkNavType } from '../atoms/LinkNavigate';
import UserInfo from '../atoms/UserInfo';
import CardLinkNavigate from '../molecules/CardLinkNavigate';
import { FaUserGraduate } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { FaMoneyBillTransfer, FaUsers } from 'react-icons/fa6';
import { BiSolidLock, BiSolidUserDetail } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { DataUser } from '../../interfaces/store';

export default function SideNav() {
  const { role } = useSelector((state: { auth: DataUser }) => state.auth);
  return (
    <div className="flex flex-col gap-3">
      <UserInfo email="ubay@gmail.com" role={role} />
      <CardLinkNavigate
        data={role === 'siswa' ? dataUserNavLink : dataAdminNavLink}
      />
    </div>
  );
}

const dataUserNavLink: LinkNavType[] = [
  {
    icon: <FaUserGraduate />,
    title: 'Daftar Siswa',
    to: '/daftar-siswa',
  },
  {
    icon: <BiSolidLock />,
    title: 'Ganti Kata Sandi',
    to: '/reset-password',
  },
];

const dataAdminNavLink: LinkNavType[] = [
  {
    icon: <MdOutlineDateRange />,
    title: 'Tahun Ajaran',
    to: '/tahun-ajaran',
  },
  {
    icon: <GiTeacher />,
    title: 'Kelas',
    to: '/kelas',
  },
  {
    icon: <FaUsers />,
    title: 'Siswa',
    to: '/siswa',
  },
  {
    icon: <BiSolidUserDetail />,
    title: 'Pendaftar',
    to: '/pendaftar',
  },
  {
    icon: <FaMoneyBillTransfer />,
    title: 'Pembayaran',
    to: '/pendaftar',
  },
  {
    icon: <BiSolidLock />,
    title: 'Ganti Kata Sandi',
    to: '/reset-password',
  },
];
