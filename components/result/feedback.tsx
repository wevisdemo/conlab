import { FunctionComponent, useState } from 'react';
import Button from '../button';
import Card from '../card';
import Spinner from '../spinner';

type FeedbackProps = {
  onSubmit: (feedback: string) => Promise<void>;
  onClose: () => void;
};

const Feedback: FunctionComponent<FeedbackProps> = ({ onSubmit, onClose }) => {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const Promise = () => (
    <>
      <div className={'text-headline-2 text-center'}>
        ขอบคุณจ้า!
        <br />
        เราได้รับข้อเสนอ
        <br />
        รัฐธรรมนูญของคุณแล้ว
      </div>
      <div className={'flex flex-col items-center'}>
        <img
          src={require('../../assets/images/Small-Hearts.png')}
          alt="Thank you"
          className="w-[112px] h-[112px]"
        />
      </div>
      <div className={'flex flex-col text-center'}>
        <Button state="solid" onClick={onClose}>
          ปิด
        </Button>
      </div>
    </>
  );

  const FeedbackComponent = () => {
    const [feedback, setFeedback] = useState('');

    const submit = async () => {
      setIsloading(true);

      await onSubmit(feedback);

      setShowResults(true);
      setIsloading(false);
    };

    return (
      <>
        <div className={'text-headline-2 text-center'}>
          มีอะไรเพิ่มเติมอยากบอกพวกเราไหม?
        </div>
        <input
          className={
            'bg-gray-100 h-[72px] rounded-xl text-body-2 text-gray-400 w-full p-2'
          }
          placeholder="อยากแก้หมวด 1... (ถ้าไม่มีก็เว้นไว้ได้)"
          maxLength={280}
          type="text"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></input>
        <div className={'flex flex-col text-center'}>
          <Button state="solid" onClick={submit}>
            ต่อไป
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="section fixed z-40 inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center">
      <Card className="bg-white space-y-4 w-full flex flex-col justify-center items-center">
        {isLoading ? (
          <Spinner />
        ) : showResults ? (
          <Promise />
        ) : (
          <FeedbackComponent />
        )}
      </Card>
    </div>
  );
};

export default Feedback;
