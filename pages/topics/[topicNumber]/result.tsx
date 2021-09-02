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
import Metadata from '../../../components/metadata';

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
      <Metadata topic={topic} />

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
          ผลการออกแบบรัฐธรรมนูญของคุณ
        </h1>

        <img src={topic.iconUrl} alt={topic.shortTitle} className="w-32 h-32" />

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
          CONLAB - รัฐธรรมนูญก้าวหน้าจะนำไปจัดทำเป็นข้อเสนอเพื่อร่าง
          &quot;รัฐธรรมนูญก้าวหน้า&quot; ต่อไป!
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
            ส่งข้อเสนอให้ CONstitution LAB
          </Button>
        ) : (
          <div className="rounded-xl w-full px-[17px] py-[15px] font-semibold text-center text-gray-400 bg-yellow-100">
            ส่งข้อเสนอแล้ว!
          </div>
        )}

        <DownloadResultImage node={resultSummary} />

        <Sharer path={`/topics/${topic.topicNumber}`} />

        <div className="pt-10 w-full">
          <Button
            state={submitState === 'complete' ? 'solid' : 'outline'}
            className="w-full"
            onClick={() => setIsMenuOpen(true)}
          >
            ลองออกแบบเรื่องอื่นต่อไหม?
          </Button>
        </div>
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
          onClose={(done: boolean) =>
            setSubmitState(done ? 'complete' : 'idle')
          }
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
