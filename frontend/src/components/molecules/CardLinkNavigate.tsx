import { TbLogout } from 'react-icons/tb';
import Card from '../atoms/Card';
import LinkNavigate, { LinkNavType } from '../atoms/LinkNavigate';

type Props = {
  data: LinkNavType[];
};

export default function CardLinkNavigate({ data }: Props) {
  return (
    <Card className="py-3">
      {data.map((value, index) => (
        <LinkNavigate key={index} {...value} />
      ))}
      <div className="flex items-center gap-2 [&>svg]:w-[20px] py-3 cursor-pointer">
        <TbLogout />
        <p className="font-semibold text-[14px]">Keluar</p>
      </div>
    </Card>
  );
}