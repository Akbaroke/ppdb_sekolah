import cn from '../../utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div className={cn('bg-white rounded-[10px] p-10 w-full', className)}>
      {children}
    </div>
  );
}
