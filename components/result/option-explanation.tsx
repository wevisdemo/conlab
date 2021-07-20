import { FunctionComponent } from 'react';
import { Result, ResultOption } from '../../data/topics';
import Button from '../button';
import Markdown from './markdown';

type OptionExplanationProps = {
  results: Result;
  selectedOption: ResultOption;
  // onChange: (option: ResultOption) => void;
};

const OptionExplanation: FunctionComponent<OptionExplanationProps> = ({
  results,
  selectedOption,
}) => (
  <div className="bg-gray-50 rounded-xl">
    <div className="sticky top-0">
      <div className="bg-gray-100 h-8 w-full -mb-4"></div>
      <div className="flex flex-row items-center space-x-4 text-body-2 bg-gray-0 rounded-xl px-4 py-3">
        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-black">
          {results.id}
        </div>
        <div className="flex-1 font-black">{selectedOption.title}</div>
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L7.41421 9H15C15.5523 9 16 9.44771 16 10C16 10.5523 15.5523 11 15 11H7.41421L9.70711 13.2929C10.0976 13.6834 10.0976 14.3166 9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071L4.29289 10.7071C3.90237 10.3166 3.90237 9.68342 4.29289 9.29289L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289Z"
              fill="black"
            />
          </svg>
        </button>
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289L15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L11.7071 14.7071C11.3166 15.0976 10.6834 15.0976 10.2929 14.7071C9.90237 14.3166 9.90237 13.6834 10.2929 13.2929L12.5858 11H5C4.44772 11 4 10.5523 4 10C4 9.44771 4.44772 9 5 9H12.5858L10.2929 6.70711C9.90237 6.31658 9.90237 5.68342 10.2929 5.29289Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>

    <div className="p-4 space-y-4 text-body-2">
      <Markdown>{selectedOption.descriptionMarkdown}</Markdown>

      <Button
        state="outline"
        className="flex flex-row justify-center items-center w-full"
      >
        ดูระบบสภาคู่
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2"
        >
          <path
            d="M8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.0976311 9.70711 0.292893L15.7071 6.29289C15.8946 6.48043 16 6.73478 16 7C16 7.26522 15.8946 7.51957 15.7071 7.70711L9.70711 13.7071C9.31658 14.0976 8.68342 14.0976 8.29289 13.7071C7.90237 13.3166 7.90237 12.6834 8.29289 12.2929L12.5858 8L1 8C0.447715 8 0 7.55229 0 7C0 6.44772 0.447715 6 1 6L12.5858 6L8.29289 1.70711C7.90237 1.31658 7.90237 0.683417 8.29289 0.292893Z"
            fill="black"
          />
        </svg>
      </Button>
    </div>
  </div>
);

export default OptionExplanation;
