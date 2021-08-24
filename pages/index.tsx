import Head from 'next/head';
import { useRouter } from 'next/router';
import { FunctionComponent, useRef } from 'react';
import Button from '../components/button';
import Footer from '../components/footer';
import HowItWork from '../components/how-it-work';
import NavigationBar from '../components/navigation-bar';
import TopicCard from '../components/topic-card';
import topics from '../data/topics';

const Home: FunctionComponent = () => {
  const router = useRouter();
  const howItWork = useRef<HTMLDivElement>(null);

  return (
    <main
      className="bg-gray-400 bg-top bg-no-repeat bg-double sm:bg-contain"
      style={{
        backgroundImage: `url(${require('../assets/images/header-bg.png')})`,
      }}
    >
      <Head>
        <title>Dream Constitution</title>
      </Head>
      <NavigationBar theme="transparent" hideLogo />
      <img
        src={require('../assets/images/logo-main.png')}
        alt="CONstitution LAB"
        className="w-64 md:w-96 mx-auto my-4"
      />
      <div>
        <div className="section space-y-10 py-12">
          <h1 className="text-large-2 text-oblique-shadow text-white">
            รัฐธรรมนูญ
            <p className="text-blue-200">เป็นเรื่องของทุกคน</p>
            รัฐธรรมนูญ
            <p className="text-yellow-400">เป็นกติกาสูงสุดของประเทศ</p>
          </h1>
          <div className="text-white">
            <b>CONLAB</b> - รัฐธรรมนูญก้าวหน้า
            ขอชวนทุกคนมาออกแบบรัฐธรรมนูญในแบบฉบับของตัวเองได้ที่นี่
          </div>
          <Button
            state="outline"
            className="w-full"
            onClick={() =>
              howItWork.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            CONstitution LAB คืออะไร?
          </Button>
        </div>
        <div className="section space-y-10 mt-2 p-4 bg-gray-100 py-12">
          <div className="space-y-4">
            <h2 className="text-headline-1 text-center w-full">
              ออกแบบรัฐธรรมนูญ ไม่ยากอย่างที่คิด!
            </h2>
            <p className="text-center w-full">ลองเริ่มต้นจากเรื่องที่คุณสนใจ</p>
          </div>
          {topics.map((t, index) => (
            <TopicCard
              topicNumber={t.topicNumber}
              shortTitle={t.shortTitle}
              title={t.title}
              iconUrl={t.iconUrl}
              className={index % 2 === 0 ? 'bg-blue-300' : 'bg-yellow-400'}
              onClick={() => router.push(`/topics/${t.topicNumber}`)}
              showButton={false}
              key={t.topicNumber}
            />
          ))}
          <HowItWork />
        </div>
        <div className="section bg-blue-300 p-4 space-y-4 py-12">
          <h2 className="text-headline-1 text-left w-full">ConLab คือใคร</h2>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            viverra neque vehicula donec phasellus nisl odio. Tincidunt enim, in
            sit donec at nullam. Etiam id id nibh eget. Lorem bibendum est donec
            lacus laoreet id ornare nunc.
          </div>
          <img
            src={require('../assets/images/You.svg')}
            alt=""
            width="100"
            height="100"
          ></img>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
