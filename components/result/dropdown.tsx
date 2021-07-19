import { FunctionComponent, useState } from 'react';
import { ResultOption } from '../../data/topics';

type DropdownProps = {
  options: ResultOption[];
  selectedOption: ResultOption;
  onChange: (option: ResultOption) => void;
};

const Dropdown: FunctionComponent<DropdownProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  return (
    <>
      <button
        className="inline-flex flex-row text-left items-center bg-yellow-150 py-1 border-b-2 border-black"
        onClick={() => setIsOptionsOpened(true)}
      >
        {selectedOption.title}

        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-2"
        >
          <path d="M10 0L5 6L0 0H10Z" fill="black" />
        </svg>
      </button>

      {isOptionsOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex flex-col justify-end text-body-2">
          <div className="flex-1" onClick={() => setIsOptionsOpened(false)} />
          <div className="p-4 rounded-t-xl bg-white font-black">
            เปลี่ยนตัวเลือก
          </div>

          {options.map((option) => {
            const isSelected = option.id === selectedOption.id;

            return (
              <button
                key={option.id}
                className={`flex flex-row items-center p-4 ${
                  isSelected ? 'bg-gray-50' : 'bg-white'
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOptionsOpened(false);
                }}
              >
                <span className="flex-1 text-left">{option.title}</span>

                {isSelected && (
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6644 0.252601C18.0772 0.619519 18.1143 1.25159 17.7474 1.66437L7.08075 13.6644C6.89099 13.8779 6.61898 14 6.33334 14C6.04771 14 5.7757 13.8779 5.58593 13.6644L0.252601 7.66437C-0.114317 7.25159 -0.077136 6.61952 0.335647 6.2526C0.74843 5.88568 1.3805 5.92286 1.74742 6.33565L6.33334 11.4948L16.2526 0.335647C16.6195 -0.077136 17.2516 -0.114317 17.6644 0.252601Z"
                      fill="black"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Dropdown;
