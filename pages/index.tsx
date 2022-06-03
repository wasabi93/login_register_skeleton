import type { InferGetServerSidePropsType, NextPage } from 'next';
import { getProviders, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/home.module.scss';

const Login = dynamic(() => import('../components/Login'));

const Status = dynamic(() => import('./status'));

const Home: NextPage = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="login" />
      </Head>

      <main className={styles.main}>{session ? <Status /> : <Login providers={providers} />}</main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export default Home;
