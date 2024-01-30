import { Loader, NumberInput } from '@mantine/core';

type Props = {
  label: string;
  id: string;
  value: number;
  errorLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  max?: number;
  min?: number;
  onChange: (e: number) => void;
  required?: boolean;
  placeholder?: string;
};

export default function InputNumber({
  label,
  id,
  value,
  errorLabel,
  disabled,
  isLoading,
  max,
  min,
  onChange,
  required,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col my-2 relative">
      <label htmlFor={id} className="text-[14px]">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <NumberInput
        variant="unstyled"
        id={id}
        value={value === 0 ? undefined : value}
        max={max}
        min={min}
        onChange={(e) => onChange(e as number)}
        className={`border border-[#EFF0F0] rounded-[10px] h-[37px] pl-3 text-[14px] [&>div>input]:placeholder:text-gray-300 ${
          disabled ? 'bg-[#F4F5F7]' : ''
        }`}
        placeholder={placeholder}
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
