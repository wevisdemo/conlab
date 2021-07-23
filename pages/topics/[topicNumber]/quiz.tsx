import { FunctionComponent } from 'react';
import NavigationButtons from '../../../components/quiz/navigation-buttons';
import QuestionDisplay from '../../../components/quiz/question-display';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Quiz: FunctionComponent<TopicPageProps> = ({ topic }) => (
  <div>
    <QuestionDisplay
      question={topic.questions[0]}
      totalQuestion={topic.questions.length}
    />
    <NavigationButtons next={() => alert('next')} back={() => alert('back')} />
  </div>
);

export default Quiz;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
