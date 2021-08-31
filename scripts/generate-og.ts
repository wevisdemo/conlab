import handler from 'serve-handler';
import http from 'http';
import { chromium } from 'playwright';
import topics from '../data/topics';

const SERVER_PORT = '3000';
const OUTPUT_PATH = 'out/og-images';

const server = http.createServer((request, response) =>
  handler(request, response, {
    public: 'out',
  })
);

console.log(`Starting server at port ${SERVER_PORT}...`);

server.listen(SERVER_PORT, async () => {
  const browser = await chromium.launch();

  console.log(`Capturing topic images...`);

  await Promise.all(
    topics.map(async ({ topicNumber }) => {
      const page = await browser.newPage();
      await page.goto(
        `localhost:${SERVER_PORT}/internal/generate-og/${topicNumber}`
      );

      const ogElement = await page.$('#og');
      await ogElement?.screenshot({
        path: `${OUTPUT_PATH}/${topicNumber}.png`,
      });
    })
  );

  await browser.close();
  server.close();

  console.log(`Complete! Output saved to ${OUTPUT_PATH}`);
});
