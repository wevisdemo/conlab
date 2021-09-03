import 'intersection-observer';
import type { AppProps } from 'next/app';
import smoothscroll from 'smoothscroll-polyfill';
import { useEffect } from 'react';
import '../assets/styles/globals.css';
import '../utils/firebase';
import { pageview } from '../utils/gtag';
import { useRouter } from 'next/router';

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => smoothscroll.polyfill());

  useEffect(() => {
    const handleRouteChange = (url: URL) => isProduction && pageview(url);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default App;
