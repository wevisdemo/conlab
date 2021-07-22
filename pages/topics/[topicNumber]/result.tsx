import { FunctionComponent, useState } from 'react';
import OptionExplanation from '../../../components/result/option-explanation';
import ResultSummary from '../../../components/result/result-summery';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Result: FunctionComponent<TopicPageProps> = ({ topic }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    topic.results.map(({ options }) => options[0])
  );

  return (
    <div className="p-4 space-y-12 bg-gray-100">
      <h1 className="text-large-2">ผลการออกแบบรัฐธรรมนูญในฝันของคุณ</h1>

      <div>
        {topic.results.map((result, index) => (
          <OptionExplanation
            key={result.id}
            result={result}
            selectedOption={selectedOptions[index]}
            onChange={(option) =>
              setSelectedOptions([
                ...selectedOptions.slice(0, index),
                option,
                ...selectedOptions.slice(index + 1),
              ])
            }
          />
        ))}
      </div>

      <ResultSummary
        topicNumber={topic.topicNumber}
        shortTitle={topic.shortTitle}
        resultTextMarkdown={topic.resultTextMarkdown}
        results={topic.results}
        selectedOptions={selectedOptions}
        onChange={setSelectedOptions}
        onSubmit={() => alert('submit')}
      />
    </div>
  );
};

export default Result;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
