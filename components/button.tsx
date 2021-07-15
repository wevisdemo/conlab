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
    className={`${className} border-black border-[3px] rounded-xl p-2 text-center ${
      state === 'solid' ? 'bg-black text-white' : ''
    }`}
  >
    {children}
  </button>
);

export default Button;
