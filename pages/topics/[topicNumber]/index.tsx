import { FunctionComponent } from 'react';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Topic: FunctionComponent<TopicPageProps> = () => (
  <div>รัฐสภาไทย...ควรเป็นแบบไหน</div>
);

export default Topic;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
