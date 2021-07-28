import { FunctionComponent } from 'react';

type PillProps = {
  className?: string;
};

const Pill: FunctionComponent<PillProps> = ({ children, className }) => (
  <div className={`${className} rounded-full bg-black text-gray-0 text-body-2 font-black py-1 px-3`}>
    {children}
  </div>
);

export default Pill;
