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
import { submitResult } from '../../../utils/firebase';
import DownloadResultImage from '../../../components/result/download-result-image';
import Sharer from '../../../components/sharer';

const Result: FunctionComponent<TopicPageProps> = ({ topic }) => {
  const { query } = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [suggestedOptions, setSuggestedOptions] = useState<ResultOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ResultOption[]>([]);
  const [submitState, setSubmitState] = useState<'idle' | 'open' | 'complete'>(
    'idle'
  );

  const [explanationContainer, activeExplanationIndex] = useScrollama({}, [
    suggestedOptions,
  ]);

  const submitSection = useRef<HTMLDivElement>(null);
  const resultSummary = useRef<HTMLDivElement>(null);

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

    setAnswers(answerIndexes.map((index) => index + 1));
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
      <NavigationBar
        theme="black"
        showMenu={isMenuOpen}
        menuToggleHandler={(button: 'menu' | 'close') =>
          setIsMenuOpen(button === 'menu')
        }
      />

      <div className="section flex flex-col items-center space-y-6 bg-gray-100 rounded-t-2xl">
        <Pill className="text-body-2 font-black">
          เรื่องที่ {topic.topicNumber}: {topic.shortTitle}
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

      <div
        className="section bg-yellow-400 space-y-4 py-10"
        ref={submitSection}
      >
        <h2 className="text-headline-1">ส่งข้อเสนอของคุณ</h2>

        <p className="text-body-2">
          เราอยากรู้ว่ารัฐธรรมนูญในฝันของคุณเป็นอย่างไร
          เพื่อเราจะได้พัฒนาขอเสนอการแก้ไข รัฐธรรมนูญให้ดีขึ้นต่อไป
        </p>

        <div ref={resultSummary}>
          <ResultSummary
            topic={topic}
            selectedOptions={selectedOptions}
            onChange={updateSelectedOption}
            isDisabled={submitState === 'complete'}
          />
        </div>

        {submitState !== 'complete' ? (
          <Button
            state="solid"
            className="mt-4 w-full font-medium"
            onClick={() => setSubmitState('open')}
          >
            ส่งข้อเสนอให้ DreamCon
          </Button>
        ) : (
          <div className="rounded-xl w-full px-[17px] py-[15px] font-semibold text-center text-gray-400 bg-yellow-100">
            ส่งข้อเสนอแล้ว!
          </div>
        )}

        <DownloadResultImage node={resultSummary} />

        <Sharer />
      </div>

      <div className="section bg-blue-300 space-y-6 py-10">
        <svg
          width="98"
          height="90"
          viewBox="0 0 98 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M89.1872 27.4866C89.1872 27.383 89.1872 27.2586 89.1872 27.1549C89.1872 15.1927 79.3955 5.44884 67.3747 5.44884C64.7497 5.44884 62.1455 5.92567 59.6872 6.83786C55.0622 2.50494 48.958 0.0585938 42.5205 0.0585938C32.083 0.0585938 22.8747 6.46469 19.1872 15.9805C8.39551 17.2866 0.0205078 26.4501 0.0205078 37.5208C0.0205078 49.483 9.81217 59.2269 21.833 59.2269C23.8747 59.2269 25.8955 58.9366 27.8538 58.3769C33.583 64.0988 41.3538 67.333 49.5622 67.333C54.9163 67.333 60.1038 65.9647 64.708 63.3318C68.1247 65.4257 72.083 66.5452 76.1247 66.5452C88.1455 66.5452 97.9372 56.8013 97.9372 44.8391C97.958 38.0183 94.6455 31.5708 89.1872 27.4866ZM76.1455 58.6049C72.9163 58.6049 69.8955 57.5269 67.3955 55.4952C65.9997 54.3549 64.0205 54.2927 62.5413 55.3086C58.708 57.983 54.2288 59.3927 49.5622 59.3927C42.7913 59.3927 36.4163 56.4074 32.1038 51.2037C31.333 50.2708 30.1872 49.7525 29.0205 49.7525C28.4788 49.7525 27.9163 49.8562 27.3955 50.1049C25.6247 50.872 23.7497 51.2659 21.833 51.2659C14.2288 51.2659 8.04134 45.1086 8.04134 37.5415C8.04134 29.9744 14.2288 23.8171 21.7497 23.8171C21.8538 23.8171 22.083 23.8379 22.1663 23.8379C23.9997 23.8379 25.6038 22.594 26.0413 20.8318C27.958 13.3062 34.7288 8.06103 42.5205 8.06103C47.6038 8.06103 52.3955 10.3001 55.6455 14.2184C56.8747 15.6903 58.9997 16.1049 60.6872 15.172C62.7288 14.0525 65.0413 13.4513 67.3747 13.4513C74.9788 13.4513 81.1663 19.6086 81.1663 27.1757C81.1663 27.7147 81.1247 28.2952 81.0205 29.0208C80.8122 30.6171 81.583 32.1927 82.9997 33.0013C87.2705 35.4476 89.9372 40.0086 89.9372 44.9013C89.9372 52.4476 83.7497 58.6049 76.1455 58.6049ZM30.7705 68.7635C26.8955 68.7635 23.7497 71.8732 23.7497 75.7293C23.7497 79.5854 26.8955 82.6952 30.7705 82.6952C34.6455 82.6952 37.7705 79.5854 37.7705 75.7293C37.7705 71.8732 34.6455 68.7635 30.7705 68.7635ZM13.958 79.3988C11.1663 79.3988 8.91634 81.6586 8.91634 84.4159C8.91634 87.194 11.1872 89.433 13.958 89.433C16.7497 89.433 18.9997 87.1732 18.9997 84.4159C18.9997 81.6586 16.7497 79.3988 13.958 79.3988Z"
            fill="black"
          />
        </svg>

        <p className="text-headline-1 font-black text-center">
          ยังมีเรื่องสำคัญอื่นๆ ในรัฐธรรมนูญ ที่รอคุณออกแบบอยู่นะ
        </p>

        <Button
          state="outline"
          className="w-full"
          onClick={() => setIsMenuOpen(true)}
        >
          ดูหัวข้ออื่นๆ
        </Button>
      </div>

      <Footer />

      {submitState === 'open' && (
        <Feedback
          onSubmit={(feedback) =>
            submitResult(
              topic.topicNumber,
              answers,
              suggestedOptions,
              selectedOptions,
              feedback
            )
          }
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
