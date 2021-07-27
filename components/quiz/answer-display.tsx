import { FunctionComponent } from 'react';
import { Answer } from '../../data/topics';
import Card from '../card';

type AnswerProps = {
  answer: Answer;
  questionId: number;
  onChange: () => void;
  selectedAnswerId?: number;
};

const AnswerDisplay: FunctionComponent<AnswerProps> = ({
  answer,
  questionId,
  selectedAnswerId,
  onChange,
}) => {
  const isChecked = selectedAnswerId === answer.id;

  return (
    <Card
      noShadow={isChecked}
      className={`p-0 ${
        isChecked ? 'bg-black text-white ml-[8px]' : 'bg-white'
      }`}
    >
      <label className="flex flex-inline items-center p-[20px]">
        <input
          className="min-h-[32px] min-w-[32px]"
          type="radio"
          id={answer.id.toString()}
          name={questionId.toString()}
          onChange={onChange}
          checked={isChecked}
        />
        <span className="pl-[12px] text-headline-3">{answer.text}</span>
      </label>
    </Card>
  );
};

export default AnswerDisplay;
