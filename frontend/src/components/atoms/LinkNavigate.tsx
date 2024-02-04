import { Link } from 'react-router-dom';
import { DataUser } from '../../interfaces/store';
import { useSelector } from 'react-redux';

export type LinkNavType = {
  icon: React.ReactNode;
  title: string;
  to: string;
};

export default function LinkNavigate({ icon, title, to }: LinkNavType) {
  const { role } = useSelector((state: { auth: DataUser }) => state.auth);
  return (
    <Link
      to={`/${role}${to}`}
      className="flex items-center gap-2 [&>svg]:w-[20px] py-3 border-b border-gray-100">
      {icon}
      <p className="font-semibold text-[14px]">{title}</p>
    </Link>
  );
}
