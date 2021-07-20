import { CSSProperties, FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';
import { Result, ResultOption } from '../../data/topics';
import Button from '../button';
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

      <ReactMarkdown
        skipHtml
        className="space-y-4"
        components={{
          code: renderDropdown,
          ...markdownComponents,
        }}
      >
        {
          resultTextMarkdown.replaceAll?.(
            '        ',
            '  '
          ) /* Stackedit indent with 8 spaces */
        }
      </ReactMarkdown>

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

const getIndentedListStyle = (depth: number): CSSProperties => ({
  marginLeft: depth > 0 ? depth * 20 : 25,
});

const markdownComponents: Partial<NormalComponents & SpecialComponents> = {
  ul: ({ children, depth }) => (
    <ul style={getIndentedListStyle(depth)}>{children}</ul>
  ),
  ol: ({ children, depth }) => (
    <ol style={getIndentedListStyle(depth)}>{children}</ol>
  ),
  li: ({ children, ordered }) => (
    <li className={`my-1 ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {children}
    </li>
  ),
};

export default ResultSummary;
