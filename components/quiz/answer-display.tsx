import { FunctionComponent, MouseEventHandler, useState } from 'react';
import { Answer, AnswerEffect } from '../../data/topics';

type AnswerProps = {
  answer: Answer;
  id: number;
  // onChange: (effect: AnswerEffect) => void
  noShadow?: boolean;
  state?: 'solid' | 'outline';
};

const AnswerDisplay: FunctionComponent<AnswerProps> = ({
  answer,
  id,
  noShadow,
  state,
  // onChange,
}) => {
  const [selectAnswer, setSelectAnswer] = useState(String);

  return (
    <div
      className={`rounded-xl border-[4px] border-black
    ${noShadow ? '' : 'oblique-shadow items-center w-full'}
    ${state === 'solid' ? 'bg-black text-white' : ''}`}
    >
      <label className="flex flex-inline items-center p-[20px]">
        <input
          className="min-h-[32px] min-w-[32px]"
          type="radio"
          id={`radio` + id}
          name={answer.text}
          onChange={() => setSelectAnswer(answer.text)}
          checked={selectAnswer === answer.text}
        />
        <span className="pl-[12px] text-headline-3">{answer.text}</span>
      </label>
    </div>
  );
};

export default AnswerDisplay;
