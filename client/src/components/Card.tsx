import cn from '../utils/cn';

type Props = {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  classParrent?: string;
  onClick?: () => void;
};

export default function Card({
  children,
  header,
  className,
  onClick,
  classParrent,
}: Props) {
  return (
    <div
      className={cn('bg-white rounded-[10px] w-full relative', classParrent as string)}
      onClick={onClick}>
      {header && <div className="border-b border-gray-100 p-5">{header}</div>}
      <div className={cn('p-5 rounded-[10px]', className)}>{children}</div>
    </div>
  );
}
