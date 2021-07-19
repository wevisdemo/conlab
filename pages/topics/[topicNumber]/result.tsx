import { useState } from 'react';
import ResultSummary from '../../../components/result/result-summery';
import topics from '../../../data/topics';

const Result = () => {
  const [selectedOptions, setSelectedOptions] = useState(
    topics[0].results.map(({ options }) => options[0])
  );

  return (
    <div className="p-4">
      <h1 className="text-large-2">ผลการออกแบบรัฐธรรมนูญในฝันของคุณ</h1>
      <ResultSummary
        topicNumber={topics[0].topicNumber}
        shortTitle={topics[0].shortTitle}
        resultTextMarkdown={topics[0].resultTextMarkdown}
        results={topics[0].results}
        selectedOptions={selectedOptions}
        onChange={setSelectedOptions}
      />
    </div>
  );
};

export default Result;
