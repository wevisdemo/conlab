import { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { Result, ResultOption } from '../../data/topics';
import Card from '../card';
import Pill from '../pill';
import Dropdown from './dropdown';

type ResultSummaryProps = {
  topicNumber: number;
  shortTitle: string;
  resultTextMarkdown: string;
  results: Result[];
  selectedOptions: ResultOption[];
  onChange: (options: ResultOption[]) => void;
};

const ResultSummary: FunctionComponent<ResultSummaryProps> = ({
  topicNumber,
  shortTitle,
  resultTextMarkdown,
  results,
  selectedOptions,
  onChange,
}) => {
  const renderDropdown: FunctionComponent = ({ children }) => {
    const resultIndex = results.findIndex(({ id }) => id === +(children || ''));

    return (
      <Dropdown
        options={results[resultIndex].options}
        selectedOption={selectedOptions[resultIndex]}
        onChange={(option) =>
          onChange([
            ...selectedOptions.slice(0, resultIndex),
            option,
            ...selectedOptions.slice(resultIndex + 1),
          ])
        }
      />
    );
  };

  return (
    <Card className="flex flex-col items-center space-y-2">
      <h3 className="text-body-2 font-black">ข้อเสนอรัฐธรรมนูญในฝัน</h3>
      <Pill className="text-small-1">
        หมวดที่ {topicNumber}: {shortTitle}
      </Pill>
      <div>
        <ReactMarkdown
          components={{
            code: renderDropdown,
          }}
        >
          {resultTextMarkdown}
        </ReactMarkdown>
      </div>
    </Card>
  );
};

export default ResultSummary;
