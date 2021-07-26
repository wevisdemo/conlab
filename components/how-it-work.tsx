import { FunctionComponent } from 'react';

type HowItWorkProps = {
  className?: string;
};

const HowItWork: FunctionComponent<HowItWorkProps> = ({ className }) => (
  <div className={`${className} flex flex-col items-center space-y-4`}>
    <h1 className="text-headline-1">
      Dream Consitution จะช่วยคุณออกแบบรัฐธรรมนูญได้อย่างไร?
    </h1>
    {HowItWorkItem({
      imageName: 'Collaboration.svg',
      orderNo: 1,
      text: 'ตอบคำถามเกี่ยวกับความสนใจหรือความเชื่อของคุณ',
    })}
    {HowItWorkItem({
      imageName: 'Idea.svg',
      orderNo: 2,
      text: 'เราจะแนะนำข้อเสนอรัฐธรรมนูญจากคำตอบของคุณ',
    })}
    {HowItWorkItem({
      imageName: 'Reading.svg',
      orderNo: 3,
      text: 'ลองศึกษาขอเสนอ ถ้ายังไม่ใช่ลองดูตัวเลือกอื่นด้วย',
    })}
    {HowItWorkItem({
      imageName: 'Paper-Plane.svg',
      orderNo: 4,
      text: 'ส่งข้อเสนอของคุณให้พวกเรา นำไปปรับปรุงข้อเสนอการแก้ไขรัฐธรรมนูญ',
    })}
  </div>
);

interface HowItWorkItemProps {
  imageName: string;
  orderNo: number;
  text: string;
}

const HowItWorkItem: FunctionComponent<HowItWorkItemProps> = ({
  imageName,
  orderNo,
  text,
}) => (
  <div className="bg-gray-0 flex items-center space-x-2 p-2 rounded-3 w-full">
    <img
      src={require(`../assets/images/${imageName}`)}
      alt=""
      className="w-10 h-10"
    />
    <div className="flex-grow-1">
      <div className="font-bold">{orderNo}</div>
      <div>{text}</div>
    </div>
  </div>
);

export default HowItWork;
