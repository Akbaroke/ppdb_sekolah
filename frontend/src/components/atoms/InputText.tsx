import React, { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

interface InputTextProps {
  label: string;
  id: string;
  value: string;
  errorLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'text' | 'email' | 'password';
  maxLength?: number;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({
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
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (id === 'no_ponsel' && inputValue.length > 0) {
      onChange(inputValue);
    }
  }, [inputValue, id, onChange]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const newValue = typeof e === 'string' ? e : e.target.value;
    setInputValue(newValue);
  };

  const renderInput = () => {
    const commonInputProps = {
      className: `border border-[#EFF0F0] rounded-[10px] w-full h-[37px] pl-3 text-[14px] placeholder:text-gray-300 ${
        disabled ? 'bg-[#F4F5F7]' : ''
      }`,
      maxLength,
      placeholder,
    };

    return id === 'no_ponsel' ? (
      <PhoneInput
        value={inputValue || value}
        onChange={(e) => handleInputChange(e || '')}
        country="ID"
        {...commonInputProps}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => handleInputChange(e)}
        disabled={isLoading || disabled}
        {...commonInputProps}
      />
    );
  };

  return (
    <div className="flex flex-col my-2 relative">
      <label htmlFor={id} className="text-[14px]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {errorLabel && <p className="text-red-500 text-[12px]">{errorLabel}</p>}
      {isLoading && (
        <Loader color="gray" size="xs" className="absolute bottom-2 right-3" />
      )}
    </div>
  );
};

export default InputText;
