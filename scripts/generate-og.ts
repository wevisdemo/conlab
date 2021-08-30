import { chromium } from 'playwright';
import topics from '../data/topics';

const OUTPUT_PATH = 'out/images/og';

(async () => {
  const browser = await chromium.launch();

  await Promise.all(
    topics.map(async ({ topicNumber }) => {
      const page = await browser.newPage();
      await page.goto(`localhost:3000/internal/generate-og/${topicNumber}`);

      const ogElement = await page.$('#og');
      await ogElement?.screenshot({
        path: `${OUTPUT_PATH}/${topicNumber}.png`,
      });
    })
  );

  await browser.close();
})();
