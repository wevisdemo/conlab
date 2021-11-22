import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { parseResultToCsv, Topics } from '../utils/result-parser';
import { production } from './dream-constitution-default-rtdb-export.json';

const OUTDIR = './responses';

if (!existsSync(OUTDIR)) {
  mkdirSync(OUTDIR);
}

parseResultToCsv(production.topics as Topics).forEach((output, topicIndex) =>
  writeFileSync(`${OUTDIR}/topic-${topicIndex + 1}.csv`, output)
);
