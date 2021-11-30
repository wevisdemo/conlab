import { useRouter } from 'next/router';
import { FunctionComponent, useRef } from 'react';
import Button from '../../../components/button';
import ExternalLink from '../../../components/external-link';
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

  const themeBackgroundColor =
    topic.topicNumber % 2 === 0 ? 'bg-yellow-400' : 'bg-blue-300';

  return (
    <div className="bg-gray-100">
      <Metadata topic={topic} />
      <NavigationBar
        className={themeBackgroundColor}
        theme="transparent"
        fixHamburger
      />
      <main>
        <div className={`section space-y-10 pb-10 ${themeBackgroundColor}`}>
          <div className="space-y-6 flex flex-col items-center">
            <div className="space-y-3 flex flex-col items-center">
              <Pill className="mx-auto">
                เรื่องที่ {topic.topicNumber}: {topic.shortTitle}
              </Pill>
              <h1 className="text-large-2 text-center">{topic.title}</h1>
            </div>
            <img
              src={topic.iconUrl}
              alt={topic.shortTitle}
              className="w-32 h-32"
            />
            <Markdown>{topic.descriptionMarkdown}</Markdown>
          </div>

          <div className="space-y-3">
            <Button onClick={goToQuiz} state="solid" className="w-full">
              เริ่มออกแบบรัฐธรรมนูญ
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
            <ExternalLink href="https://conlabth.medium.com/">
              <Button state="outline" className="w-full">
                อ่านบทความ
              </Button>
            </ExternalLink>
          </div>

          <Sharer path={`/topics/${topic.topicNumber}`} />
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
            className={themeBackgroundColor}
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
