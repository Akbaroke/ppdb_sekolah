import cn from '../../utils/cn';

type Props = {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ children, header, className }: Props) {
  return (
    <div className="bg-white rounded-[10px] w-full">
      {header && <div className="border-b border-gray-100 p-5">{header}</div>}
      <div className={cn('p-5', className)}>{children}</div>
    </div>
  );
}
