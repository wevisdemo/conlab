import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import NavigationButtons from '../../../components/quiz/navigation-buttons';
import QuestionDisplay from '../../../components/quiz/question-display';
import AnswerDisplay from '../../../components/quiz/answer-display';

import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Quiz: FunctionComponent<TopicPageProps> = ({ topic }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const router = useRouter();

  const next = () => {
    if (currentNumber < topic.questions.length - 1) {
      setCurrentNumber(currentNumber + 1);
    } else {
      const mockedAnswer: number[] = new Array(topic.questions.length).fill(0);

      router.push(
        `/topics/${topic.topicNumber}/result?ans=${mockedAnswer.join('')}`
      );
    }
  };

  if (topic.questions.length === 0) {
    return <div>No questions found is this topic</div>;
  }

  return (
    <div>
      <QuestionDisplay
        question={topic.questions[currentNumber]}
        totalQuestion={topic.questions.length}
      />
      <div>
        {topic.questions[currentNumber].answers.map(function (value, index) {
          return (
            <AnswerDisplay
              answer={value}
              id={index}
              key={index}
              state="outline"
            />
          );
        })}
      </div>
      <NavigationButtons next={next} back={() => alert('back')} />
    </div>
  );
};

export default Quiz;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
