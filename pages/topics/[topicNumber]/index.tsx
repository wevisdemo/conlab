import Head from 'next/head';
import { useRouter } from 'next/router';
import { FunctionComponent, useRef } from 'react';
import Button from '../../../components/button';
import Footer from '../../../components/footer';
import HowItWork from '../../../components/how-it-work';
import NavigationBar from '../../../components/navigation-bar';
import Pill from '../../../components/pill';
import Markdown from '../../../components/result/markdown';
import TopicCard from '../../../components/topic-card';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Topic: FunctionComponent<TopicPageProps> = ({ topic }) => {
  const router = useRouter();
  const howItWork = useRef<HTMLDivElement>(null);

  const goToQuiz = () => {
    router.push(`/topics/${topic.topicNumber}/quiz`);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>{topic.shortTitle} | Dream Constitution</title>
      </Head>
      <NavigationBar className="bg-blue-300" theme="transparent" />
      <main>
        <div className="section bg-blue-300 space-y-4">
          <Pill>
            เรื่องที่ {topic.topicNumber}: {topic.shortTitle}
          </Pill>
          <div className="text-large-2 text-center">{topic.title}</div>
          <Markdown>{topic.descriptionMarkdown}</Markdown>
          <div>
            <img
              src={topic.iconUrl}
              alt=""
              width="120"
              height="120"
              className="my-5"
            ></img>
          </div>
          <Button onClick={goToQuiz} state="solid" className="w-full">
            เริ่มกันเลย
          </Button>
          <Button
            state="outline"
            className="w-full"
            onClick={() =>
              howItWork.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            นี่คืออะไร
          </Button>
        </div>
        <div className="section mt-8" ref={howItWork}>
          <HowItWork />
        </div>
        <div className="section mt-2 mb-12">
          <div className="text-headline-2 mb-10 w-full">
            ถ้าพร้อมแล้วก็เริ่มเลย...
          </div>
          <TopicCard
            topicNumber={topic.topicNumber}
            shortTitle={topic.shortTitle}
            title={topic.title}
            iconUrl={topic.iconUrl}
            className="bg-blue-300"
            onClick={goToQuiz}
            showButton={true}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Topic;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
