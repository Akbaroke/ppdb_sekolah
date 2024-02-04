import * as React from 'react';
import { Input, Loader, Textarea } from '@mantine/core';
import { IMaskInput } from 'react-imask';
// import Input from 'react-phone-number-input/input';

type Props = {
  label: string;
  id: string;
  value: string;
  errorLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'no_phone';
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  required?: boolean;
  placeholder?: string;
};

const InputText: React.FC<Props> = ({
  label,
  id,
  value,
  errorLabel,
  disabled,
  isLoading,
  type = 'text',
  maxLength,
  onChange,
  required,
  placeholder,
}) => {
  // const [inputan, setInputan] = React.useState('');

  // React.useEffect(() => {
  //   if (id === 'no_ponsel') {
  //     if (inputan.length > 0) {
  //       onChange(inputan);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inputan, id]);

  return (
    <div className="flex flex-col my-2 relative">
      <label htmlFor={id} className="text-[14px]">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {type === 'textarea' ? (
        <Textarea
          variant="unstyled"
          id={id}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          disabled={isLoading || disabled}
          maxLength={maxLength}
          className={`border border-[#EFF0F0] rounded-[10px] h-max pl-3 text-[14px] [&>div>textarea]:placeholder:text-gray-300 ${
            disabled ? 'bg-[#F4F5F7]' : ''
          }`}
          placeholder={placeholder}
          minRows={4}
          maxRows={4}
        />
      ) : type === 'no_phone' ? (
        <Input.Wrapper variant="unstyled" id={id}>
          <Input
            variant="unstyled"
            id={id}
            placeholder={placeholder}
            component={IMaskInput}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            disabled={isLoading || disabled}
            className={`border border-[#EFF0F0] rounded-[10px] h-[37px] pl-3 text-[14px] [&>input]:placeholder:text-gray-300 ${
              disabled ? 'bg-[#F4F5F7]' : ''
            }`}
            mask="0000-0000-0000"
          />
        </Input.Wrapper>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading || disabled}
          maxLength={maxLength}
          className={`border border-[#EFF0F0] rounded-[10px] h-[37px] pl-3 text-[14px] placeholder:text-gray-300 ${
            disabled ? 'bg-[#F4F5F7]' : ''
          }`}
          placeholder={placeholder}
        />
      )}
      {errorLabel ? (
        <p className="text-red-500 text-[12px]">{errorLabel}</p>
      ) : null}
      {isLoading ? (
        <Loader color="gray" size="xs" className="absolute bottom-2 right-3" />
      ) : null}
    </div>
  );
};

export default InputText;

{
  /* <Input
          value={inputan || value}
          onChange={(e) => setInputan(e || '')}
          country="ID"
          className={`border border-[#EFF0F0] rounded-[10px] h-[37px] pl-3 text-[14px] placeholder:text-gray-300 ${
            disabled ? 'bg-[#F4F5F7]' : ''
          }`}
          maxLength={16}
          placeholder={placeholder}
        /> */
}