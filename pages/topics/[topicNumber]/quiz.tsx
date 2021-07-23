import { FunctionComponent } from 'react';
import QuestionDisplay from '../../../components/quiz/question-display';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Quiz: FunctionComponent<TopicPageProps> = ({ topic }) => (
  <QuestionDisplay
    question={topic.questions[0]}
    totalQuestion={topic.questions.length}
  />
);

export default Quiz;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
