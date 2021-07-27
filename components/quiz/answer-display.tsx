import { FunctionComponent } from 'react';
import { Answer } from '../../data/topics';

type AnswerProps = {
  answer: Answer;
  id: number;
  // onChange: (effect: AnswerEffect) => void
  onChange: () => void;
  selectedAnswer?: String;
};

const AnswerDisplay: FunctionComponent<AnswerProps> = ({
  answer,
  selectedAnswer,
  id,
  onChange,
}) => {
  const checkedEffect =
    selectedAnswer === answer.text
      ? 'bg-black text-white'
      : 'oblique-shadow items-center w-full';

  return (
    <div className={`rounded-xl border-[4px] border-black ${checkedEffect}`}>
      <label className="flex flex-inline items-center p-[20px]">
        <input
          className="min-h-[32px] min-w-[32px]"
          type="radio"
          id={`radio` + id}
          name={answer.text}
          onChange={onChange}
          checked={selectedAnswer === answer.text}
        />
        <span className="pl-[12px] text-headline-3">{answer.text}</span>
      </label>
    </div>
  );
};

export default AnswerDisplay;
