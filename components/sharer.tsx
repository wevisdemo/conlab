import { FunctionComponent } from 'react';
import Button from './button';
import ExternalLink from './external-link';
import { DOMAIN_NAME } from './metadata';

const ShareButton: FunctionComponent<{ href: string }> = ({
  href,
  children,
}) => (
  <ExternalLink href={href}>
    <Button
      state="outline"
      className="w-10 h-10 flex justify-center items-center px-0"
    >
      {children}
    </Button>
  </ExternalLink>
);

const Sharer: FunctionComponent<{ path?: string }> = ({ path }) => {
  const encodedUrl = encodeURI(`${DOMAIN_NAME}${path || ''}`);

  return (
    <div className="flex flex-row space-x-3 items-center ">
      <p className="text-body-2 font-black">ชวนเพื่อนมาลองทำ</p>
      <ShareButton
        href={`http://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
      >
        <svg
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V9H1V13H4V21H8V13H11L12 9H8V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H12V1Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ShareButton>
      <ShareButton href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}>
        <svg
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 2.00005C22.0424 2.67552 20.9821 3.19216 19.86 3.53005C19.2577 2.83756 18.4573 2.34674 17.567 2.12397C16.6767 1.90121 15.7395 1.95724 14.8821 2.2845C14.0247 2.61176 13.2884 3.19445 12.773 3.95376C12.2575 4.71308 11.9877 5.61238 12 6.53005V7.53005C10.2426 7.57561 8.50127 7.18586 6.93101 6.39549C5.36074 5.60513 4.01032 4.43868 3 3.00005C3 3.00005 -1 12 8 16C5.94053 17.398 3.48716 18.099 1 18C10 23 21 18 21 6.50005C20.9991 6.2215 20.9723 5.94364 20.92 5.67005C21.9406 4.66354 22.6608 3.39276 23 2.00005Z"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ShareButton>
    </div>
  );
};

export default Sharer;
