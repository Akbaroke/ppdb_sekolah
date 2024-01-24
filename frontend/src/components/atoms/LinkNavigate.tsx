import { Link } from 'react-router-dom';

export type LinkNavType = {
  icon: React.ReactNode;
  title: string;
  to: string;
};

export default function LinkNavigate({ icon, title, to }: LinkNavType) {
  const role = 'user';
  return (
    <Link
      to={`/${role}${to}`}
      className="flex items-center gap-2 [&>svg]:w-[20px] py-3 border-b border-gray-100">
      {icon}
      <p className="font-semibold text-[14px]">{title}</p>
    </Link>
  );
}
