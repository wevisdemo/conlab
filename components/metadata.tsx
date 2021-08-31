import Head from 'next/head';
import { FunctionComponent } from 'react';
import { Topic } from '../data/topics';

type MetadataProps = {
  topic?: Topic;
};

export const DOMAIN_NAME = 'https://conlab.conlabinth.com';

const Metadata: FunctionComponent<MetadataProps> = ({ topic }) => {
  const title = topic
    ? `CONstitution LAB - ออกแบบ ${topic.title} ในรัฐธรรมนูญ`
    : 'CONstitution LAB - ห้องออกแบบรัฐธรรมนูญ';
  const description = topic
    ? `ชวนทุกคนมาออกแบบ ${topic.title} ในรัฐธรรมนูญแบบฉบับของตัวเอง`
    : 'ชวนทุกคนมาออกแบบรัฐธรรมนูญในแบบฉบับของตัวเองได้ที่นี่';
  const image = `${DOMAIN_NAME}/og-images/${
    topic ? topic.topicNumber : 'default'
  }.png`;
  const url = `${DOMAIN_NAME}${topic ? `/topics/${topic.topicNumber}` : ''}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" key="description" content={description} />

      <meta property="og:title" key="og:title" content={title} />
      <meta
        property="og:description"
        key="og:description"
        content={description}
      />
      <meta property="og:image" key="og:image" content={image} />
      <meta property="og:url" key="og:url" content={url} />

      <meta
        name="twitter:card"
        key="twitter:card"
        content="summary_large_image"
      />
    </Head>
  );
};

export default Metadata;
