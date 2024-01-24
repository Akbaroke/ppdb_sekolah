import cn from '../../utils/cn';

type Props = {
  title: string;
  type: 'success' | 'warning' | 'danger' | 'custom';
  className?: string;
};

export default function Badge({ title, type, className }: Props) {
  return (
    <div
      className={cn(
        'py-[2px] px-2 rounded-full text-[12px] font-semibold w-max h-max',
        {
          'bg-success_secondary text-success_primary': type === 'success',
          'bg-warning_secondary text-warning_primary': type === 'warning',
          'bg-danger_secondary text-danger_primary': type === 'danger',
        },
        className
      )}>
      {title}
    </div>
  );
}
