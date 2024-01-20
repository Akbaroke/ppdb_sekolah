import { Loader } from '@mantine/core';
import React from 'react';
import cn from '../../utils/cn';

interface ButtonProps {
  type?: 'submit' | 'button';
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  children,
  isLoading,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      type={type || 'button'}
      disabled={isLoading || isDisabled}
      className={cn(
        'rounded-[5px] min-w-[151px] h-[30px] font-bold text-[16px]  transition-all px-6 capitalize bg-gold text-white',
        isLoading ? 'grid place-items-center opacity-70' : '',
        isLoading || isDisabled
          ? 'cursor-not-allowed'
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
