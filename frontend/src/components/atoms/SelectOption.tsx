import { Loader, Select, SelectItem } from '@mantine/core';

type Props = {
  label: string;
  id: string;
  value: string;
  errorLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  required?: boolean;
  placeholder?: string;
  data: SelectItem[];
};

export default function SelectOption({
  label,
  id,
  value,
  errorLabel,
  disabled,
  isLoading,
  onChange,
  required,
  placeholder,
  data,
}: Props) {
  return (
    <div className="flex flex-col my-2 relative">
      <label htmlFor={id} className="text-[14px]">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Select
        id={id}
        variant="unstyled"
        value={value}
        placeholder={placeholder}
        data={data}
        transitionProps={{
          transition: 'pop',
          duration: 200,
          timingFunction: 'ease',
        }}
        styles={() => ({
          item: {
            // applies styles to selected item
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor: '#003317',
                color: '#fff',
              },
            },

            // applies styles to hovered item (with mouse or keyboard)
            '&[data-hovered]': {},
          },
        })}
        disabled={isLoading || disabled}
        onChange={(e) => onChange(e as string)}
        className={`border border-[#EFF0F0] rounded-[10px] h-[37px] pl-3 text-[14px] [&>div>div>input]:placeholder:text-gray-300 ${
          disabled ? 'bg-[#F4F5F7]' : ''
        }`}
        clearable
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
