import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout'

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Layout>
      <SessionProvider session={session} refetchInterval={0} >
        <Component {...pageProps} />
      </SessionProvider>
    </Layout >
  );
};

export default MyApp;
