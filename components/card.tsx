import { FunctionComponent } from 'react';

type CardProps = {
  className?: string;
  noShadow?: boolean;
};

const Card: FunctionComponent<CardProps> = ({
  children,
  noShadow,
  className,
}) => (
  <div
    className={`${className} rounded-xl border-4 border-black p-4 ${
      noShadow ? '' : 'oblique-shadow'
    }`}
  >
    {children}
  </div>
);

export default Card;
