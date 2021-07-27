import { FunctionComponent } from 'react';

type ArrowButtonProps = {
  isDisabled?: boolean;
  onClick: () => void;
};

const ArrowButton: FunctionComponent<ArrowButtonProps> = ({
  isDisabled,
  onClick,
  children,
}) => (
  <button
    className={`flex-1 flex justify-center items-center ${
      isDisabled ? 'bg-gray-100' : 'bg-gray-150 active:bg-gray-200'
    }`}
    disabled={isDisabled}
    onClick={onClick}
  >
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isDisabled ? 'opacity-25' : ''}
    >
      {children}
    </svg>
  </button>
);

type ExplanationNavigationProps = {
  previous: () => void;
  next: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
};

const ExplanationNavigation: FunctionComponent<ExplanationNavigationProps> = ({
  previous,
  next,
  isPreviousDisabled,
  isNextDisabled,
}) => (
  <div className="fixed right-4 bottom-4 z-20 flex flex-col w-8 h-20 rounded-full overflow-hidden">
    <ArrowButton isDisabled={isPreviousDisabled} onClick={previous}>
      <path
        d="M7 0C7.26522 5.96046e-08 7.51957 0.105357 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L8 3.41421L8 15C8 15.5523 7.55228 16 7 16C6.44772 16 6 15.5523 6 15L6 3.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.097631 6.68342 0.292893 6.29289L6.29289 0.292893C6.48043 0.105357 6.73479 0 7 0Z"
        fill="#394243"
      />
    </ArrowButton>

    <ArrowButton isDisabled={isNextDisabled} onClick={next}>
      <path
        d="M7 0C7.55228 0 8 0.447715 8 1V12.5858L12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289C14.0976 8.68342 14.0976 9.31658 13.7071 9.70711L7.70711 15.7071C7.31658 16.0976 6.68342 16.0976 6.29289 15.7071L0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289C0.683417 7.90237 1.31658 7.90237 1.70711 8.29289L6 12.5858V1C6 0.447715 6.44772 0 7 0Z"
        fill="#394243"
      />
    </ArrowButton>
  </div>
);

export default ExplanationNavigation;
