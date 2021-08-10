import { FunctionComponent } from 'react';
import { ResultOption, Topic } from '../../data/topics';
import Card from '../card';
import Dropdown from './dropdown';
import Markdown from './markdown';

type ResultSummaryProps = {
  topic: Topic;
  selectedOptions: ResultOption[];
  onChange: (index: number, option: ResultOption) => void;
  isDisabled?: boolean;
};

const ResultSummary: FunctionComponent<ResultSummaryProps> = ({
  topic,
  selectedOptions,
  onChange,
  isDisabled,
}) => {
  const { topicNumber, shortTitle, iconUrl, resultTextMarkdown, results } =
    topic;

  const renderDropdown: FunctionComponent = ({ children }) => {
    const resultIndex = results.findIndex(({ id }) => id === +(children || ''));

    return (
      <Dropdown
        options={results[resultIndex].options}
        selectedOption={selectedOptions[resultIndex]}
        onChange={(option) => onChange(resultIndex, option)}
        isDisabled={isDisabled}
      />
    );
  };

  return (
    <div className="relative flex flex-col items-center mt-12">
      <Card className="flex z-10 flex-col items-center bg-yellow-100 space-y-3 p-2">
        <div className="absolute -top-12 w-20 h-20 p-1 rounded-full border-4 border-black bg-yellow-200 overflow-hidden">
          {iconUrl && (
            <img className="w-full h-full" src={iconUrl} alt={shortTitle} />
          )}
        </div>

        <div className="text-body-2 font-black text-center space-y-2 pt-3">
          <h3>ข้อเสนอรัฐธรรมนูญในฝัน</h3>
          <h4>
            เรื่องที่ {topicNumber} {shortTitle}
          </h4>
        </div>

        <svg
          width="80"
          height="5"
          viewBox="0 0 80 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="2.5"
            y1="2.5"
            x2="77.5"
            y2="2.5"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1 12"
          />
        </svg>

        <Markdown
          components={{
            code: renderDropdown,
          }}
          className="text-gray-500 font-normal"
        >
          {resultTextMarkdown}
        </Markdown>
      </Card>

      <div className="absolute -top-12 w-20 h-20 rounded-full oblique-shadow mr-[8px]" />
    </div>
  );
};

export default ResultSummary;
