import { FunctionComponent } from 'react';
import Button from '../button';

type NavigationButtonsProps = {
  back: () => void;
  next: () => void;
};

const NavigationButtons: FunctionComponent<NavigationButtonsProps> = ({
  back,
  next,
}) => (
  <div className="flex flex-row space-x-2 w-full">
    <Button state="outline" onClick={back}>
      <svg
        width="32"
        height="28"
        viewBox="0 0 32 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.4142 0.585787C16.1953 1.36684 16.1953 2.63317 15.4142 3.41421L6.82843 12H30C31.1046 12 32 12.8954 32 14C32 15.1046 31.1046 16 30 16H6.82843L15.4142 24.5858C16.1953 25.3668 16.1953 26.6332 15.4142 27.4142C14.6332 28.1953 13.3668 28.1953 12.5858 27.4142L0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14C0 13.4696 0.210714 12.9609 0.585786 12.5858L12.5858 0.585786C13.3668 -0.195262 14.6332 -0.195262 15.4142 0.585787Z"
          fill="black"
        />
      </svg>
    </Button>
    <Button state="solid" className="flex-1 flex justify-center" onClick={next}>
      <svg
        width="32"
        height="28"
        viewBox="0 0 32 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5858 0.585786C17.3668 -0.195262 18.6332 -0.195262 19.4142 0.585787L31.4142 12.5858C31.7893 12.9609 32 13.4696 32 14C32 14.5304 31.7893 15.0391 31.4142 15.4142L19.4142 27.4142C18.6332 28.1953 17.3668 28.1953 16.5858 27.4142C15.8047 26.6332 15.8047 25.3668 16.5858 24.5858L25.1716 16L2 16C0.895431 16 0 15.1046 0 14C0 12.8954 0.89543 12 2 12L25.1716 12L16.5858 3.41421C15.8047 2.63316 15.8047 1.36683 16.5858 0.585786Z"
          fill="#FCFFFF"
        />
      </svg>
    </Button>
  </div>
);

export default NavigationButtons;
