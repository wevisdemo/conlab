import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import Button from '../../../components/button';
import Footer from '../../../components/footer';
import Hint from '../../../components/result/hint';
import NavigationBar from '../../../components/navigation-bar';
import Pill from '../../../components/pill';
import ExplanationNavigation from '../../../components/result/explanation-navigation';
import OptionExplanation from '../../../components/result/option-explanation';
import ResultSummary from '../../../components/result/result-summery';
import SuggestedOptions from '../../../components/result/suggested-options';
import Spinner from '../../../components/spinner';
import { ResultOption } from '../../../data/topics';
import { useScrollama } from '../../../utils/scrollama';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';
import Feedback from '../../../components/result/feedback';

const Result: FunctionComponent<TopicPageProps> = ({ topic }) => {
  const { query } = useRouter();

  const [suggestedOptions, setSuggestedOptions] = useState<ResultOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ResultOption[]>([]);
  const [submitState, setSubmitState] = useState<'idle' | 'open' | 'complete'>(
    'idle'
  );

  const [explanationContainer, activeExplanationIndex] = useScrollama({}, [
    suggestedOptions,
  ]);

  const submitSection = useRef<HTMLDivElement>(null);

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

  const updateSelectedOption = (index: number, option: ResultOption) =>
    setSelectedOptions([
      ...selectedOptions.slice(0, index),
      { ...option },
      ...selectedOptions.slice(index + 1),
    ]);

  return (
    <div className="bg-black">
      <NavigationBar theme="black" />

      <div className="flex flex-col items-center p-4 space-y-6 bg-gray-100 rounded-t-2xl">
        <Pill className="text-body-2 font-black">
          หมวดที่ {topic.topicNumber}: {topic.shortTitle}
        </Pill>

        <h1 className="text-headline-2 text-center">
          ผลการออกแบบรัฐธรรมนูญในฝันของคุณ
        </h1>

        <img src={topic.iconUrl} alt={topic.shortTitle} />

        <SuggestedOptions options={suggestedOptions} />

        <div className="flex flex-col">
          <Hint />

          <div ref={explanationContainer}>
            {topic.results.map((result, index) => (
              <OptionExplanation
                key={result.id}
                result={result}
                selectedOption={selectedOptions[index]}
                onChange={(option) => updateSelectedOption(index, option)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="section bg-yellow-400 space-y-4" ref={submitSection}>
        <h2 className="text-headline-1 pt-4">ส่งข้อเสนอของคุณ</h2>

        <p className="text-body-2">
          เราอยากรู้ว่ารัฐธรรมนูญในฝันของคุณเป็นอย่างไร
          เพื่อเราจะได้พัฒนาขอเสนอการแก้ไข รัฐธรรมนูญให้ดีขึ้นต่อไป
        </p>

        <div>
          <ResultSummary
            topic={topic}
            selectedOptions={selectedOptions}
            onChange={updateSelectedOption}
          />
        </div>

        {submitState !== 'complete' ? (
          <Button
            state="solid"
            className="mt-4 w-full max-w-lg font-medium"
            onClick={() => setSubmitState('open')}
          >
            ส่งข้อเสนอให้ DreamCon
          </Button>
        ) : (
          <div className="rounded-xl w-full px-[17px] py-[15px] font-semibold text-center text-gray-400 bg-yellow-100">
            ส่งข้อเสนอแล้ว!
          </div>
        )}
      </div>

      <div className="section bg-blue-300 space-y-6">
        <img
          src={require('../../../assets/images/thinking-bubble.png')}
          alt="Thinking"
        />

        <p className="text-headline-1 font-black text-center">
          ยังมีเรื่องสำคัญอื่นๆ ในรัฐธรรมนูญ ที่รอคุณออกแบบอยู่นะ
        </p>

        <Button state="outline" className="w-full">
          ดูหัวข้ออื่นๆ
        </Button>
      </div>

      <Footer />

      {submitState === 'open' && (
        <Feedback
          onSubmit={() => new Promise((resolve) => setTimeout(resolve, 2000))}
          onClose={() => setSubmitState('complete')}
        />
      )}

      {activeExplanationIndex !== null && (
        <>
          <ExplanationNavigation
            previous={() =>
              explanationContainer.current?.children[
                activeExplanationIndex - 1
              ].scrollIntoView({ behavior: 'smooth' })
            }
            next={() =>
              explanationContainer.current?.children[
                activeExplanationIndex + 1
              ].scrollIntoView({ behavior: 'smooth' })
            }
            isPreviousDisabled={activeExplanationIndex === 0}
            isNextDisabled={activeExplanationIndex === topic.results.length - 1}
          />

          <div className="fixed inset-x-0 bottom-4 flex justify-center">
            <button
              className="bg-yellow-400 rounded-full py-2 px-4 text-body-2"
              onClick={() =>
                submitSection.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              ข้ามไปที่ข้อเสนอของคุณ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
