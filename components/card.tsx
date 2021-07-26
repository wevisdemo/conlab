import { FunctionComponent, MouseEventHandler } from 'react';

type CardProps = {
  className?: string;
  noShadow?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const Card: FunctionComponent<CardProps> = ({
  children,
  noShadow,
  className,
  onClick,
}) => (
  <div
    className={`${className} rounded-xl border-4 border-black p-4 ${
      noShadow ? '' : 'oblique-shadow'
    }`}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Card;
