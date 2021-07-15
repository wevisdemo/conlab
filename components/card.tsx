import { FunctionComponent } from 'react';

type CardProps = {
  noShadow?: boolean;
};

const Card: FunctionComponent<CardProps> = ({ children, noShadow }) => (
  <div
    className={`rounded-xl border-4 border-black p-4 ${
      noShadow ? '' : 'oblique-shadow'
    }`}
  >
    {children}
  </div>
);

export default Card;
