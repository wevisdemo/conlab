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
  const [selectAnswerIds, setSelectAnswerIds] = useState<
    (number | undefined)[]
  >(new Array(topic.questions.length).fill(undefined));

  const router = useRouter();

  if (topic.questions.length === 0) {
    return <div>No questions found is this topic</div>;
  }

  const currentQuestion = topic.questions[currentNumber];

  const next = () => {
    if (currentNumber < topic.questions.length - 1) {
      setCurrentNumber(currentNumber + 1);
    } else {
      router.push(
        `/topics/${topic.topicNumber}/result?ans=${selectAnswerIds.join('')}`
      );
    }
  };

  const back = () => {
    if (currentNumber > 0) {
      setCurrentNumber(currentNumber - 1);
    } else {
      router.push(`/topics/${topic.topicNumber}`);
    }
  };

  return (
    <div>
      <QuestionDisplay
        question={currentQuestion}
        totalQuestion={topic.questions.length}
      />

      <div className="space-y-2">
        {currentQuestion.answers.map((answer) => (
          <AnswerDisplay
            questionId={currentQuestion.id}
            answer={answer}
            selectedAnswerId={selectAnswerIds[currentNumber]}
            key={`${currentQuestion.id}-${answer.id}`}
            onChange={() =>
              setSelectAnswerIds([
                ...selectAnswerIds.slice(0, currentNumber),
                answer.id,
                ...selectAnswerIds.slice(currentNumber + 1),
              ])
            }
          />
        ))}
      </div>

      <NavigationButtons next={next} back={back} />
    </div>
  );
};

export default Quiz;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
