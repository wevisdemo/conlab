import { FunctionComponent } from 'react';
import ExternalLink from '../components/external-link';

type FollowUsProps = {
  dark?: boolean;
};

const FollowUs: FunctionComponent<FollowUsProps> = ({ dark = false }) => {
  const fill = dark ? 'black' : 'white';
  return (
    <div className="flex flex-row space-x-1">
      <p
        className={`text-small-2 md:text-small-1 my-auto ${
          dark ? '' : 'text-white'
        }`}
      >
        ติดตามเรา
      </p>
      <ExternalLink href="https://facebook.com/conlabth">
        <svg
          className="w-6 h-6"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Facebook"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.175 9.15C17.65 9.15 17.2 9.15 16.675 9.15C16 9.15 15.625 9.525 15.55 10.125C15.55 10.65 15.55 11.175 15.55 11.7C15.55 11.925 15.625 11.85 15.775 11.85C16.525 11.85 17.275 11.85 18.025 11.85C18.25 11.85 18.325 11.925 18.325 12.15C18.25 13.05 18.175 13.875 18.1 14.775C18.1 15 18.025 15 17.8 15C17.2 15 16.6 15 16 15C15.55 15 15.625 14.925 15.625 15.375C15.625 18.15 15.625 20.85 15.625 23.625C15.625 23.925 15.55 24 15.25 24C14.2 24 13.225 24 12.175 24C11.875 24 11.875 23.925 11.875 23.625C11.875 22.275 11.875 20.85 11.875 19.5C11.875 18.075 11.875 16.725 11.875 15.3C11.875 15.075 11.8 15 11.575 15C11.125 15 10.675 15 10.225 15C10.075 15 10 14.925 10 14.775C10 13.875 10 13.05 10 12.15C10 12 10.075 11.925 10.225 11.925C10.675 11.925 11.125 11.925 11.575 11.925C11.8 11.925 11.875 11.85 11.875 11.625C11.875 10.95 11.875 10.275 11.875 9.6C11.875 8.775 12.1 8.025 12.625 7.35C13.225 6.525 14.125 6.15001 15.1 6.07501C16.15 6.00001 17.2 6.07501 18.175 6.07501C18.325 6.07501 18.325 6.15 18.325 6.3C18.325 7.2 18.325 8.1 18.325 8.925C18.4 9.075 18.325 9.15 18.175 9.15Z"
            {...{ fill }}
          ></path>
        </svg>
      </ExternalLink>
      <ExternalLink href="https://twitter.com/conlabth">
        <svg
          className="w-6 h-6"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Twitter"
        >
          <path
            d="M22.2 11.325C22.2 11.475 22.2 11.625 22.2 11.775C22.2 16.65 18.45 22.35 11.625 22.35C9.52499 22.35 7.57499 21.75 5.92499 20.7C6.22499 20.7 6.52499 20.775 6.82499 20.775C8.54999 20.775 10.125 20.175 11.4 19.2C9.74999 19.2 8.39999 18.075 7.94999 16.65C8.17499 16.725 8.39999 16.725 8.62499 16.725C8.99999 16.725 9.29999 16.65 9.59999 16.575C7.87499 16.2 6.59999 14.7 6.59999 12.975C6.59999 12.975 6.59999 12.975 6.59999 12.9C7.12499 13.2 7.64999 13.35 8.24999 13.35C7.34999 12.6 6.74999 11.475 6.74999 10.2C6.74999 9.52501 6.89999 8.85001 7.27499 8.32501C9.07499 10.575 11.85 12.075 14.925 12.225C14.85 11.925 14.85 11.7 14.85 11.4C14.85 9.37501 16.5 7.72501 18.525 7.72501C19.575 7.72501 20.55 8.17501 21.225 8.92501C22.05 8.77501 22.875 8.47501 23.55 8.02501C23.25 8.92501 22.65 9.60001 21.9 10.05C22.65 9.97501 23.4 9.75001 24 9.45001C23.55 10.125 22.875 10.8 22.2 11.325Z"
            {...{ fill }}
          />
        </svg>
      </ExternalLink>
      <ExternalLink href="https://instagram.com/conlabth">
        <svg
          className="w-6 h-6"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="7.5" y="7.5" width="15" height="15" rx="2.5" stroke={fill} />
          <circle cx="15" cy="15" r="3.5" stroke={fill} />
          <circle cx="20" cy="10" r="1" {...{ fill }} />
        </svg>
      </ExternalLink>
      <ExternalLink href="https://clubhouse.com/club/conlab">
        <div className="text-white text-body-2 w-6 h-6 flex justify-center items-center">
          👋
        </div>
      </ExternalLink>
      <ExternalLink
        href="https://conlabth.medium.com/"
        className="flex justify-center items-center px-1"
      >
        <svg
          className="w-4 h-4 m-auto"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={fill}
            d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"
          />
        </svg>
      </ExternalLink>
    </div>
  );
};

export default FollowUs;
