import { ADMIN_PROFILE, USER_PROFILE } from '../../assets';
import Card from './Card';

type Props = {
  role: string;
  email: string;
};

export default function UserInfo({ role, email }: Props) {
  const isAdmin = role === 'admin';
  return (
    <Card className="flex items-center gap-5 w-[333px]">
      <img src={isAdmin ? ADMIN_PROFILE : USER_PROFILE} alt="" />
      <div>
        <h1 className="font-bold">{isAdmin ? 'Admin' : 'Orang Tua/Wali'}</h1>
        <p className="text-gray-400 overflow-ellipsis overflow-hidden w-[200px]">
          {email}
        </p>
      </div>
    </Card>
  );
}
