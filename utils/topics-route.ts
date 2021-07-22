import { GetStaticPaths, GetStaticProps } from 'next';
import topics, { Topic } from '../data/topics';

export type TopicPageProps = {
  topic: Topic;
};

export const getTopicsStaticPaths: GetStaticPaths = async () => ({
  paths: topics.map(({ topicNumber }) => ({
    params: { topicNumber: topicNumber.toString() },
  })),
  fallback: false,
});

export const getTopicsStaticProps: GetStaticProps = async (context) => {
  const topic =
    topics.find(
      (topic) => topic.topicNumber === +(context.params?.topicNumber as string)
    ) || null;

  if (!topic) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { topic },
  };
};
