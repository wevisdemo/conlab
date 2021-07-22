import { FunctionComponent } from 'react';
import {
  getTopicsStaticPaths,
  getTopicsStaticProps,
  TopicPageProps,
} from '../../../utils/topics-route';

const Quiz: FunctionComponent<TopicPageProps> = () => (
  <div>
    1/2 ผู้แทนราษฎรต้องมาจากการ เลือกตั้งโดยตรงทั้งหมดเท่านั้น
    จึงจะทำหน้าที่ได้ดี
  </div>
);

export default Quiz;

export const getStaticPaths = getTopicsStaticPaths;
export const getStaticProps = getTopicsStaticProps;
