import { useRouter } from 'next/router';
import { FunctionComponent, useRef } from 'react';
import Button from '../../../components/button';
import Footer from '../../../components/footer';
import HowItWork from '../../../components/how-it-work';
import Metadata from '../../../components/metadata';
import NavigationBar from '../../../components/navigation-bar';
import Pill from '../../../components/pill';
import Markdown from '../../../components/result/markdown';
import Sharer from '../../../components/sharer';
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
      <Metadata topic={topic} />
      <NavigationBar className="bg-blue-300" theme="transparent" fixHamburger />
      <main>
        <div className="section bg-blue-300 space-y-4">
          <Pill>
            เรื่องที่ {topic.topicNumber}: {topic.shortTitle}
          </Pill>
          <div className="text-large-2 text-center">{topic.title}</div>
          <div>
            <img
              src={topic.iconUrl}
              alt={topic.shortTitle}
              className="my-5 w-32 h-32"
            />
          </div>
          <Markdown>{topic.descriptionMarkdown}</Markdown>
          <Button onClick={goToQuiz} state="solid" className="w-full">
            ออกแบบรัฐธรรมนูญ
          </Button>
          <Button
            state="outline"
            className="w-full"
            onClick={() =>
              howItWork.current?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            CONstitution LAB คืออะไร?
          </Button>
          <div className="py-6">
            <Sharer path={`/topics/${topic.topicNumber}`} />
          </div>
        </div>
        <div className="section mt-8" ref={howItWork}>
          <HowItWork />
        </div>
        <div className="section mt-2 mb-12">
          <div className="text-headline-2 mb-10 w-full">
            ถ้าพร้อมแล้ว มาออกแบบรัฐธรรมนูญในแบบฉบับของตัวเองกันเลย
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
