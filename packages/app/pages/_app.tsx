import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const App = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </Providers>
);

export default App;
