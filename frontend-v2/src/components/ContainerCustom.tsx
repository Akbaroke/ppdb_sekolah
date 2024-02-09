import cn from '../utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerCustom({ children, className }: Props) {
  return (
    <div className={cn('max-w-[1200px] m-auto px-5', className)}>
      {children}
    </div>
  );
}
