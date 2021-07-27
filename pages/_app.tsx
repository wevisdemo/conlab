import 'intersection-observer';
import type { AppProps } from 'next/app';
import smoothscroll from 'smoothscroll-polyfill';
import { useEffect } from 'react';
import '../assets/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => smoothscroll.polyfill());

  return <Component {...pageProps} />;
};

export default App;
