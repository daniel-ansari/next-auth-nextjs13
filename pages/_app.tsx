import "tailwindcss/tailwind.css";

import '../styles/index.css';
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout'

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session} refetchInterval={0} >
      <Layout>
        <Component {...pageProps} />
      </Layout >
    </SessionProvider>
  );
};

export default MyApp;
