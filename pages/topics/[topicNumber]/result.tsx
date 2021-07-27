import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../../../components/button';
import OptionExplanation from '../../../components/result/option-explanation';
import ResultSummary from '../../../components/result/result-summery';
import SuggestedOptions from '../../../components/result/suggested-options';
import Spinner from '../../../components/spinner';
import { ResultOption } from '../../../data/topics';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Result: FunctionComponent<TopicPageProps> = ({ topic }) => {
  const { query } = useRouter();

  const [suggestedOptions, setSuggestedOptions] = useState<ResultOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ResultOption[]>([]);

  useEffect(() => {
    if (!query.ans) {
      return;
    }

    const answerIndexes: number[] = query.ans
      ? (query.ans as string).split('').map((ans) => +ans - 1)
      : new Array(topic.questions.length).fill(0);

    const resultScores = topic.questions.reduce(
      (scores, { answers }, questionIndex) => {
        const { effect } = answers[answerIndexes[questionIndex]];
        scores[effect.resultId - 1][effect.resultOptionId - 1]++;

        return scores;
      },
      topic.results.map(({ options }) => new Array(options.length).fill(0))
    );

    const suggestedOptions = topic.results.map(({ options }, index) => {
      const maxScore = Math.max(...resultScores[index]);
      const winnerOptionIndex = resultScores[index].indexOf(maxScore);

      return options[winnerOptionIndex];
    });

    setSuggestedOptions(suggestedOptions);
    setSelectedOptions(suggestedOptions);
  }, [query.ans, topic.questions, topic.results]);

  if (suggestedOptions.length === 0) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-12 bg-gray-100">
      <h1 className="text-large-2">ผลการออกแบบรัฐธรรมนูญในฝันของคุณ</h1>

      <SuggestedOptions options={suggestedOptions} />

      <div>
        {topic.results.map((result, index) => (
          <OptionExplanation
            key={`${result.id}-${selectedOptions[index].id}`}
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

      <div>
        <ResultSummary
          topic={topic}
          selectedOptions={selectedOptions}
          onChange={setSelectedOptions}
        />

        <Button state="solid" className="mt-4 w-full max-w-lg font-medium">
          ส่งข้อเสนอให้ DreamCon
        </Button>
      </div>
    </div>
  );
};

export default Result;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
