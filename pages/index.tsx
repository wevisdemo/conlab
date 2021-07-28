import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import Button from '../components/button';
import Footer from '../components/footer';
import HowItWork from '../components/how-it-work';
import NavigationBar from '../components/navigation-bar';
import TopicCard from '../components/topic-card';
import topics from '../data/topics';

const Home: FunctionComponent = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Dream Constitution</title>
      </Head>
      <NavigationBar theme="transparent" />
      <main>
        <div className="section p-4 space-y-10">
          <div className="text-large-2 text-center w-full">
            มาร่วมกันออกแบบรัฐธรรมนูญกันเถอะ
          </div>
          <div className="text-center w-full">
            เราเชื่อว่ารัฐธรรมนูญเป็นเรื่องของทุกคน และใครๆ ก็ร่วมออกแบบได้
          </div>
          <div>
            <img
              src={require('../assets/images/Typewriter.svg')}
              alt=""
              width="100"
              height="100"
            ></img>
          </div>
          <Link href="">
            <a className="w-full">
              <Button state="outline" className="w-full">
                นี่คืออะไร
              </Button>
            </a>
          </Link>
        </div>
        <div className="section space-y-10 mt-2 p-4">
          <div className="space-y-4">
            <div className="text-headline-2 text-center w-full">
              มาร่วมออกแบบในประเด็นที่สำคัญในรัฐธรรมนูญ
            </div>
            <div className="text-center w-full">
              ลองเริ่มจากเรื่องที่คุณสนใจดูสิ
            </div>
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
        </div>
        <div className="section p-4 mt-2 mb-8">
          <HowItWork />
        </div>
        <div className="section bg-blue-300 p-4 space-y-4">
          <div className="text-headline-2 text-left w-full">ConLab คือใคร</div>
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
