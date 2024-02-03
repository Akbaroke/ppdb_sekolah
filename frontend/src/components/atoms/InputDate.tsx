import { Loader } from '@mantine/core';
import { DateInput } from '@mantine/dates';

type Props = {
  label: string;
  id: string;
  value: Date;
  errorLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onChange: (e: Date) => void;
  required?: boolean;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
};

export default function InputDate({
  label,
  id,
  value,
  errorLabel,
  disabled,
  isLoading,
  onChange,
  required,
  placeholder,
  maxDate,
  minDate,
}: Props) {
  return (
    <div className="flex flex-col my-2 relative">
      <label htmlFor={id} className="text-[14px]">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <DateInput
        id={id}
        variant="unstyled"
        valueFormat="DD/MM/YYYY"
        placeholder={placeholder}
        disabled={isLoading || disabled}
        value={value}
        maxDate={maxDate}
        minDate={minDate}
        onChange={(e) => onChange(e as Date)}
        className={`border border-[#EFF0F0] rounded-[10px] h-[37px] pl-3 text-[14px] [&>div>input]:placeholder:text-gray-300 ${
          disabled ? 'bg-[#F4F5F7]' : ''
        }`}
        styles={{
          day: {
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor: '#003317',
                color: '#fff',
              },
            },
          },
        }}
      />
      {errorLabel ? (
        <p className="text-red-500 text-[12px]">{errorLabel}</p>
      ) : null}
      {isLoading ? (
        <Loader color="gray" size="xs" className="absolute bottom-2 right-3" />
      ) : null}
    </div>
  );
}
