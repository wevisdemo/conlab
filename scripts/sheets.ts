import parse from 'csv-parse/lib/sync';
import networkFetch from 'node-fetch';

export interface Topic {
  topicNumber: number;
  title: string;
  shortTitle: string;
  iconUrl: string;
  description: string;
  resultMarkdown: string;
}

export interface Question {
  topicNumber: number;
  questionNumber: number;
  groupNumber: number;
  text: string;
}

export interface Answer {
  topicNumber: number;
  questionNumber: number;
  optionNumber: number;
  text: string;
}

export interface Option {
  topicNumber: number;
  groupNumber: number;
  optionNumber: number;
  title: string;
  descriptionMarkdown: string;
}

export async function fetch({
  topicCsvUrl,
  questionCsvUrl,
  answerCsvUrl,
  optionCsvUrl,
}: {
  topicCsvUrl: string;
  questionCsvUrl: string;
  answerCsvUrl: string;
  optionCsvUrl: string;
}) {
  return {
    topics: await get<Topic>(topicCsvUrl),
    questions: await get<Question>(questionCsvUrl),
    answers: await get<Answer>(answerCsvUrl),
    options: await get<Option>(optionCsvUrl),
  };
}

async function get<T>(url: string): Promise<T[]> {
  const res = await networkFetch(url);
  const raw = await res.text();
  return parse(raw, {
    cast: true,
    columns: true,
    from: 1,
    skipEmptyLines: true,
  }) as T[];
}
