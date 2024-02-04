import { FaPlus } from 'react-icons/fa';
import Card from './Card';

type Props = {
  onClick?: () => void;
};

export default function CardPlus({ onClick }: Props) {
  return (
    <div onClick={onClick}>
      <Card className="grid place-items-center border border-dashed border-gray-300 py-8 hover:shadow-md cursor-pointer transition-all duration-300 rounded-[10px]">
        <FaPlus className="w-[22px] text-gray-300" />
      </Card>
    </div>
  );
}
