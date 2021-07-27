import { FunctionComponent } from 'react';
import { Answer } from '../../data/topics';

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
  const checkedEffect =
    selectedAnswerId === answer.id
      ? 'bg-black text-white'
      : 'oblique-shadow items-center w-full';

  return (
    <div className={`rounded-xl border-[4px] border-black ${checkedEffect}`}>
      <label className="flex flex-inline items-center p-[20px]">
        <input
          className="min-h-[32px] min-w-[32px]"
          type="radio"
          id={answer.id.toString()}
          name={questionId.toString()}
          onChange={onChange}
          checked={selectedAnswerId === answer.id}
        />
        <span className="pl-[12px] text-headline-3">{answer.text}</span>
      </label>
    </div>
  );
};

export default AnswerDisplay;
