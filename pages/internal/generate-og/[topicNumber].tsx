import { FunctionComponent } from 'react';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const GenerateOgPage: FunctionComponent<TopicPageProps> = ({
  topic: { title },
}) => (
  <div
    className="w-[600px] h-[315px] flex flex-col items-center p-12"
    style={{
      backgroundImage: `url(${require('../../../assets/images/og/bg.png')})`,
    }}
  >
    <img src={require('../../../assets/images/og/logo.png')} alt="Logo" />
    <h1
      className={`font-black text-yellow-400 text-oblique-shadow text-center ${
        title.length < 20 ? 'mt-8 text-[64px]' : 'mt-4 text-[56px]'
      }`}
    >
      {title}
    </h1>
  </div>
);

export default GenerateOgPage;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
