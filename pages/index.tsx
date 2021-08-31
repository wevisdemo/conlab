import { useRouter } from 'next/router';
import { FunctionComponent, useRef } from 'react';
import Button from '../components/button';
import Card from '../components/card';
import Footer from '../components/footer';
import HowItWork from '../components/how-it-work';
import Metadata from '../components/metadata';
import NavigationBar from '../components/navigation-bar';
import Sharer from '../components/sharer';
import TopicCard from '../components/topic-card';
import topics from '../data/topics';

const Home: FunctionComponent = () => {
  const router = useRouter();
  const topicSection = useRef<HTMLDivElement>(null);
  const howItWork = useRef<HTMLDivElement>(null);

  return (
    <main
      className="bg-gray-400 bg-top bg-no-repeat bg-double sm:bg-contain"
      style={{
        backgroundImage: `url(${require('../assets/images/header-bg.png')})`,
      }}
    >
      <Metadata />

      <NavigationBar theme="transparent" hideLogo fixHamburger />
      <img
        src={require('../assets/images/logo-main.png')}
        alt="CONstitution LAB"
        className="w-64 md:w-96 mx-auto mt-16 mb-10"
      />
      <div>
        <div className="section space-y-10 pb-10">
          <h1 className="text-large-2 text-oblique-shadow text-white w-full">
            รัฐธรรมนูญ
            <p className="text-blue-200">เป็นเรื่องของทุกคน</p>
            รัฐธรรมนูญ
            <p className="text-yellow-400">เป็นกติกาสูงสุดของประเทศ</p>
          </h1>
          <div className="text-white">
            <b>CONLAB</b> - รัฐธรรมนูญก้าวหน้า
            ขอชวนทุกคนมาออกแบบรัฐธรรมนูญในแบบฉบับของตัวเองได้ที่นี่
          </div>
          <div className="space-y-3">
            <Button
              state="solid"
              className="w-full bg-gray-400"
              onClick={() =>
                topicSection.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              เริ่มออกแบบรัฐธรรมนูญ
            </Button>
            <Button
              state="outline"
              className="w-full bg-gray-400"
              onClick={() =>
                howItWork.current?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              CONstitution LAB คืออะไร?
            </Button>
          </div>
          <Sharer />
        </div>
        <div
          className="section space-y-10 mt-2 p-4 bg-gray-100 py-12"
          ref={topicSection}
        >
          <div className="space-y-4">
            <h2 className="text-headline-1 text-center w-full">
              ออกแบบรัฐธรรมนูญ
              <br />
              ไม่ยากอย่างที่คิด!
            </h2>
            <p className="text-center w-full">ลองเริ่มต้นจากเรื่องที่คุณสนใจ</p>
          </div>
          {topics.map((topic) => (
            <TopicCard
              topicNumber={topic.topicNumber}
              shortTitle={topic.shortTitle}
              title={topic.title}
              iconUrl={topic.iconUrl}
              className={
                topic.topicNumber % 2 === 0 ? 'bg-yellow-400' : 'bg-blue-300'
              }
              onClick={() => router.push(`/topics/${topic.topicNumber}`)}
              showButton={false}
              key={topic.topicNumber}
            />
          ))}
          <div ref={howItWork}>
            <HowItWork />
          </div>
        </div>
        <div className="section bg-blue-300 p-4 space-y-8 py-12">
          <h2 className="text-headline-1 text-left w-full">
            CONLAB - รัฐธรรมนูญก้าวหน้า คือใคร?
          </h2>
          <p>
            CONLAB - รัฐธรรมนูญก้าวหน้า คือ กลุ่มคนรุ่นใหม่จากหลากหลายวงการ
            ที่ต้องการผลักดันให้ประเทศไทยมีรัฐธรรมนูญที่ “ก้าวหน้า”
            เพื่อคุณภาพชีวิตที่ดีของประชาชน ก่อตั้งขึ้นในช่วงหลังการเลือกตั้งปี
            2562
          </p>
          <div>
            <Card className="p-0 overflow-hidden">
              <img
                src={require('../assets/images/CONLAB-10-Dec-2019.jpg')}
                alt="CONstitution LAB ครั้งที่ 1 วันที่ 10 ธันวาคม 2562"
              />
            </Card>
            <p className="text-xs font-normal text-center pt-3">
              CONstitution LAB ครั้งที่ 1 วันที่ 10 ธันวาคม 2562
            </p>
          </div>

          <p>รัฐธรรมนูญที่ “ก้าวหน้า” ต้องยึดอยู่บน 3 หลักการเสมอ</p>
          <div className="space-y-6">
            <AboutPoint title="1 - เป็นกลางและเป็นธรรม">
              สร้างกติกาที่เป็นที่ยอมรับของทุกฝ่ายในสังคม
              เปิดโอกาสให้ทุกกลุ่มความคิดสามารถรณรงค์-แข่งขัน
              ได้อย่างเท่าเทียมและอยู่ร่วมกันได้โดยไม่แตกแยก
            </AboutPoint>
            <AboutPoint title="2 - สอดคล้องกับหลักประชาธิปไตยสากล">
              มีเนื้อหาที่คุ้มครองสิทธิเสรีภาพของประชาชน
              และวางความสัมพันธ์ของโครงสร้างทางการเมืองต่างๆ
              ให้มีความสอดคล้องระหว่างอำนาจและที่มา
            </AboutPoint>
            <AboutPoint title="3 - แก้ปัญหาที่อาจเกิดขึ้นในวันหน้า ตั้งแต่วันนี้">
              ออกแบบโครงสร้างประเทศให้สามารถรับมือกับการเปลี่ยนแปลงที่รวดเร็วของโลกได้อย่างมีประสิทธิภาพ
            </AboutPoint>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

type AboutPointProps = {
  title: string;
};

const AboutPoint: FunctionComponent<AboutPointProps> = ({
  title,
  children,
}) => (
  <div className="text-body-2 space-y-2">
    <h4 className="font-bold">{title}</h4>
    <p className="font-normal">{children}</p>
  </div>
);

export default Home;
