import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...restProps }: ButtonProps) => {
  return (
    <button {...restProps} className='dse-button__container'>
      {label}
    </button>
  );
};

export default Button;
