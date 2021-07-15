import Head from 'next/head';
import Button from '../components/button';
import Card from '../components/card';
import Pill from '../components/pill';

const Home = () => (
  <div>
    <Head>
      <title>Dream Constitution</title>
    </Head>

    <main className="flex flex-col justify-center items-center min-h-screen space-y-8">
      <img
        src={require('../assets/images/next.png')}
        alt="Next"
        className="w-48"
      />

      <div className="text-center">
        <p className="text-huge">text-huge</p>
        <p className="text-large-1">text-large-1</p>
        <p className="text-large-2">text-large-2</p>
        <p className="text-headline-1">text-headline-1</p>
        <p className="text-headline-2">text-headline-2</p>
        <p>text-body-1 (default)</p>
        <p className="text-body-2">text-body-2</p>
        <p className="text-small-1">text-small-1</p>
        <p className="text-small-2">text-small-2</p>
      </div>

      <div className="flex flex-row space-x-2">
        <Button state="solid" onClick={() => alert('solid clicked')}>
          solid button
        </Button>
        <Button state="outline" onClick={() => alert('outline clicked')}>
          outline button
        </Button>
      </div>

      <div>
        <Pill>pill</Pill>
      </div>

      <div className="flex flex-row space-x-4">
        <Card>This is card</Card>
        <Card noShadow>This is card with no shadow</Card>
      </div>
    </main>
  </div>
);

export default Home;
