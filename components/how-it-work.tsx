import { FunctionComponent } from 'react';

type HowItWorkProps = {
  className?: string;
};

const HowItWork: FunctionComponent<HowItWorkProps> = ({ className }) => (
  <div className={`${className} flex flex-col items-center space-y-4`}>
    <h1 className="text-headline-1">
      CONstitution LAB - ห้องออกแบบรัฐธรรมนูญ
      <span className="font-normal"> จะช่วยคุณออกแบบรัฐธรรมนูญได้อย่างไร?</span>
    </h1>
    <HowItWorkItem orderNo={1} imageName="Collaboration.svg">
      ให้คุณตอบคำถาม 10 ข้อในแต่ละเรื่องตามความสนใจหรือแนวคิดของคุณ
    </HowItWorkItem>
    <HowItWorkItem orderNo={2} imageName="Idea.svg">
      <strong>CONstitution LAB </strong>
      จะแนะนำข้อเสนอรัฐธรรมนูญเบื้องต้นที่เหมาะสมกับคุณ
    </HowItWorkItem>
    <HowItWorkItem orderNo={3} imageName="Reading.svg">
      ลองเปรียบเทียบข้อเสนอเบื้องต้นของคุณกับตัวเลือกอื่น ๆ
      แล้วเลือกข้อเสนอที่ตรงกับแนวคิดของคุณมากที่สุด
    </HowItWorkItem>
    <HowItWorkItem orderNo={4} imageName="Paper-Plane.svg">
      อ่านสรุปข้อเสนอของคุณ และส่งให้
      <strong> CONLAB - รัฐธรรมนูญก้าวหน้า </strong>
      นำไปจัดทำเป็นข้อเสนอเพื่อร่าง &quot;รัฐธรรมนูญก้าวหน้า&quot; ต่อไป!
    </HowItWorkItem>
  </div>
);

interface HowItWorkItemProps {
  imageName: string;
  orderNo: number;
}

const HowItWorkItem: FunctionComponent<HowItWorkItemProps> = ({
  imageName,
  orderNo,
  children,
}) => (
  <div className="bg-gray-0 flex items-center space-x-2 p-2 rounded-[12px] w-full">
    <img
      src={require(`../assets/images/${imageName}`)}
      alt=""
      width="80"
      height="80"
    />
    <div className="flex-grow-1 text-body-2">
      <div className="font-bold">{orderNo}</div>
      <div className="font-normal">{children}</div>
    </div>
  </div>
);

export default HowItWork;
