import { FunctionComponent } from 'react';
import NavigationBar from '../../../components/navigation-bar';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Topic: FunctionComponent<TopicPageProps> = () => (
  <div>
    <NavigationBar theme="transparent" />
    <div>รัฐสภาไทย...ควรเป็นแบบไหน</div>
  </div>
);

export default Topic;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
