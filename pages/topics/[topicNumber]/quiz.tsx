import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import NavigationButtons from '../../../components/quiz/navigation-buttons';
import QuestionDisplay from '../../../components/quiz/question-display';
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
      router.push(`/topics/${topic.topicNumber}/result`);
    }
  };

  return (
    <div>
      <QuestionDisplay
        question={topic.questions[currentNumber]}
        totalQuestion={topic.questions.length}
      />
      <NavigationButtons next={next} back={() => alert('back')} />
    </div>
  );
};

export default Quiz;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
