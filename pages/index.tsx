import Head from 'next/head';

const Home = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col justify-center items-center min-h-screen space-y-8">
      <h1 className="text-3xl text-blue-400 font-bold">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <img
        src={require('../assets/images/next.png')}
        alt="Next"
        className="w-48"
      />
      <img
        src={require('../assets/images/vercel.svg')}
        alt="Vercel"
        className="w-48"
      />
    </main>
  </div>
);

export default Home;
