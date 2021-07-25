import { FunctionComponent } from 'react';

type LinkProps = {
  href: string;
  className?: string;
};

const ExternalLink: FunctionComponent<LinkProps> = (props) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`block ${props.className || ''}`}
  >
    {props.children}
  </a>
);

export default ExternalLink;
