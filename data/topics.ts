import mockTopics from './mock-topics.json';

export default mockTopics as Topic[];

export interface Topic {
  topicNumber: number;
  title: string;
  shortTitle: string;
  iconUrl: string;
  descriptionMarkdown: string;
  results: Result[];
  resultTextMarkdown: string;
  questions: Question[];
}

export interface Result {
  id: number;
  options: ResultOption[];
}

export interface ResultOption {
  id: number;
  title: string;
  descriptionMarkdown: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  effect: AnswerEffect;
}

export interface AnswerEffect {
  resultId: number;
  resultOptionId: number;
}
