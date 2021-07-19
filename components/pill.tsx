import { FunctionComponent } from 'react';

type PillProps = {
  className?: string;
};

const Pill: FunctionComponent<PillProps> = ({ children, className }) => (
  <div className={`${className} rounded-full bg-black text-white py-1 px-2`}>
    {children}
  </div>
);

export default Pill;
