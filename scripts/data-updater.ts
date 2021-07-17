import { writeFileSync } from 'fs';
import { fetch, Topic, Question, Answer, Option } from './sheets';
import {
  Topic as ProductTopic,
  Question as ProductQuestion,
  Result as ProductResult,
} from '../data/topics';

(async () => {
  const sheetUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVoucqqXL_ecLePFMHar6h0UnMS8tavxho__zNf5J8wvMTRJqpPA0Sjb4lVJKuZXluX6YukhyAAsyI/pub';
  const fetched = await fetch({
    topicCsvUrl: `${sheetUrl}?gid=2137114466&single=true&output=csv`,
    questionCsvUrl: `${sheetUrl}?gid=334453361&single=true&output=csv`,
    answerCsvUrl: `${sheetUrl}?gid=1730174097&single=true&output=csv`,
    optionCsvUrl: `${sheetUrl}?gid=591283444&single=true&output=csv`,
  });

  const topics = getTopics(
    fetched.topics,
    fetched.questions,
    fetched.answers,
    fetched.options
  );

  writeFileSync('data/topics.json', JSON.stringify(topics, null, 2));
})();

function getTopics(
  topics: Topic[],
  questions: Question[],
  answers: Answer[],
  options: Option[]
): ProductTopic[] {
  return topics.map((t) => ({
    topicNumber: t.topicNumber,
    title: t.title,
    shortTitle: t.shortTitle,
    iconUrl: t.iconUrl,
    descriptionMarkdown: t.description,
    results: getResults(t.topicNumber, options),
    resultTextMarkdown: t.resultMarkdown,
    questions: getQuestions(t.topicNumber, questions, answers),
  }));
}

function getResults(topicNumber: number, options: Option[]): ProductResult[] {
  const topicOptions = options.filter((o) => o.topicNumber === topicNumber);
  const groups: { [key: number]: Option[] } = {};

  for (const o of topicOptions) {
    if (groups[o.groupNumber]) {
      groups[o.groupNumber].push(o);
    } else {
      groups[o.groupNumber] = [o];
    }
  }

  return Object.keys(groups).map((n) => ({
    id: Number(n),
    options: groups[Number(n)].map((o) => ({
      id: o.optionNumber,
      title: o.title,
      descriptionMarkdown: o.descriptionMarkdown,
    })),
  }));
}

function getQuestions(
  topicNumber: number,
  questions: Question[],
  answers: Answer[]
): ProductQuestion[] {
  const topicQuestions = questions.filter((q) => q.topicNumber === topicNumber);

  return topicQuestions.map((q) => ({
    id: q.questionNumber,
    text: q.text,
    answers: answers
      .filter(
        (a) =>
          a.topicNumber === topicNumber && a.questionNumber === q.questionNumber
      )
      .map((a) => ({
        id: a.optionNumber,
        text: a.text,
        effect: { resultId: q.groupNumber, resultOptionId: a.optionNumber },
      })),
  }));
}
