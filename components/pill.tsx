import { FunctionComponent } from 'react';

const Pill: FunctionComponent<{}> = ({ children }) => (
  <div className="rounded-full bg-black text-white py-1 px-2">{children}</div>
);

export default Pill;
