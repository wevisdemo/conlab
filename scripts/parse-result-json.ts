import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { production } from './dream-constitution-default-rtdb-export.json';

const OUTDIR = './responses';

const getHeadColumns = (name: string, data: unknown[]) =>
  data.map((_, i) => `${name} ${i + 1}`);

if (!existsSync(OUTDIR)) {
  mkdirSync(OUTDIR);
}

production.topics.forEach((topic, topicNumber) => {
  if (topic === null) return;

  const responses = Object.entries(topic);

  const body = responses.map(
    ([key, { submitAt, answers, suggestedOptions, finalOptions, feedback }]) =>
      [
        key,
        ...new Date(submitAt).toLocaleString().split(', '),
        ...answers,
        ...suggestedOptions,
        ...finalOptions,
        feedback,
      ].join(',')
  );

  const { answers, suggestedOptions, finalOptions } = responses[0][1];

  const head = [
    'id',
    'date',
    'time',
    ...getHeadColumns('answer', answers),
    ...getHeadColumns('suggestedOption', suggestedOptions),
    ...getHeadColumns('finalOption', finalOptions),
    'feedback',
  ];

  const output = [head, ...body].join('\n');

  writeFileSync(`${OUTDIR}/topic-${topicNumber}.csv`, output);
});
