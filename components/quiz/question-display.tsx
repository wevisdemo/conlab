import { FunctionComponent } from 'react';
import { Question } from '../../data/topics';

type QuestionProps = {
  question: Question;
  totalQuestion: number;
};

const QuestionDisplay: FunctionComponent<QuestionProps> = ({
  question,
  totalQuestion,
}) => (
  <div className="text-headline-2 w-full">
    <span className="text-huge">{question.id}</span>/{totalQuestion}
    <p className="mt-4">{question.text}</p>
  </div>
);

export default QuestionDisplay;
