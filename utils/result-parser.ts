export type Topics = ({
  [key: string]: {
    answers: number[];
    feedback: string;
    finalOptions: number[];
    submitAt: number;
    suggestedOptions: number[];
  };
} | null)[];

const getHeadColumns = (name: string, data: unknown[]) =>
  data.map((_, i) => `${name} ${i + 1}`);

export const parseResultToCsv = (topics: Topics): string[] =>
  topics.reduce<string[]>((list, topic) => {
    if (!topic) return list;

    const responses = Object.entries(topic);

    const body = responses.map(
      ([
        key,
        { submitAt, answers, suggestedOptions, finalOptions, feedback },
      ]) =>
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

    return [...list, [head, ...body].join('\n')];
  }, []);
