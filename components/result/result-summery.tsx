import { FunctionComponent } from 'react';
import { Result, ResultOption } from '../../data/topics';
import Button from '../button';
import Card from '../card';
import Pill from '../pill';
import Dropdown from './dropdown';
import Markdown from './markdown';

type ResultSummaryProps = {
  topicNumber: number;
  shortTitle: string;
  resultTextMarkdown: string;
  results: Result[];
  selectedOptions: ResultOption[];
  onChange: (options: ResultOption[]) => void;
  onSubmit: () => void;
};

const ResultSummary: FunctionComponent<ResultSummaryProps> = ({
  topicNumber,
  shortTitle,
  resultTextMarkdown,
  results,
  selectedOptions,
  onChange,
  onSubmit,
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
    <Card className="flex flex-col items-center">
      <h3 className="text-body-2 font-black">ข้อเสนอรัฐธรรมนูญในฝัน</h3>
      <Pill className="text-small-1 mt-4 mb-6">
        หมวดที่ {topicNumber}: {shortTitle}
      </Pill>

      <Markdown
        components={{
          code: renderDropdown,
        }}
      >
        {resultTextMarkdown}
      </Markdown>

      <Button
        state="solid"
        className="mt-4 w-full max-w-lg"
        onClick={() => onSubmit()}
      >
        ส่งคำตอบ
      </Button>
    </Card>
  );
};

export default ResultSummary;
