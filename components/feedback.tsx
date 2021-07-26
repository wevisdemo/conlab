import { FunctionComponent, useState } from 'react';
import Button from './button';

type FeedbackProps = {
  onSubmit?: (feedback: String) => void;
};

const Feedback: FunctionComponent<FeedbackProps> = ({
  onSubmit,
}) => {
// const Feedback = () => {
  const [showResults, setShowResults] = useState(false);

  const Promise = () => (
    <div>
      <div className={'text-headline-2 px-[16px] pt-[16px] text-center'}>
        ขอบคุณจ้า!
        <br />
        เราได้รับข้อเสนอ
        <br />
        รัฐธรรมนูญของคุณแล้ว
      </div>
      <div className={'flex flex-col pb-[24px] pt-[16px] items-center'}>
        <img
          src={require('../assets/images/Small-Hearts.png')}
          alt="Next"
          className="w-[112px] h-[112px]"
        />
      </div>
      <div className={'flex flex-col px-[16px] pb-[24px] text-center'}>
          <Button state="solid" onClick={() => setShowResults(false)}>
            ต่อไป
          </Button>
      </div>
    </div>
  );

  const FeedbackComponent = () => {
    
    const onSubmit = () => {
      setShowResults(true);
    }

    return (
      <div>
        <div className={'text-headline-2 px-[16px] pt-[16px] text-center'}>
          มีอะไรเพิ่มเติมอยากบอกพวกเราไหม?
        </div>
        <div className={'flex flex-col p-[16px]'}>
          <input
            className={
              'bg-gray-100 h-[72px] pl-[12px] rounded-xl text-body-2 text-gray-400'
            }
            placeholder="อยากแก้หมวด 1... (ถ้าไม่มีก็เว้นไว้ได้)"
            maxLength={280}
            type="feedback"
            name="feedback"
          ></input>
        </div>
        <div className={'flex flex-col px-[16px] pb-[24px] text-center'}>
          <Button state="solid" onClick={onSubmit}>
            ต่อไป
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        'border-black border-[3px] rounded-xl items-center oblique-shadow'
      }
    >
      {showResults ? <Promise /> : <FeedbackComponent />}
    </div>
  );
};

export default Feedback;
