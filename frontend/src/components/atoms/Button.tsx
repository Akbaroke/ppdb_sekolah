import { Loader } from '@mantine/core';
import React from 'react';
import cn from '../../utils/cn';

interface ButtonProps {
  type?: 'submit' | 'button';
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  isLoading,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type || 'button'}
      disabled={isLoading || disabled}
      className={cn(
        'rounded-[5px] min-w-[151px] h-[30px] font-bold text-[14px]  transition-all px-6 capitalize bg-gold text-white',
        isLoading ? 'grid place-items-center opacity-70' : '',
        isLoading || disabled
          ? 'cursor-not-allowed bg-opacity-70'
          : 'active:shadow-none  active:scale-95 shadow-md',
        className
      )}
      onClick={onClick}>
      {isLoading ? (
        <>
          <Loader style={{ fill: '#fff' }} variant="dots" size="sm" />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
