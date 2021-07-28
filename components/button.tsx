import { FunctionComponent, MouseEventHandler } from 'react';

type ButtonProps = {
  state: 'solid' | 'outline';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FunctionComponent<ButtonProps> = ({
  children,
  state,
  className = '',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`${className} border-black box-sizing border-[3px] rounded-xl px-[17px] py-[15px] font-semibold text-center leading-none ${
      state === 'solid' ? 'bg-black text-gray-0' : ''
    }`}
  >
    {children}
  </button>
);

export default Button;
