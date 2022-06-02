import Link from 'next/link';
import React, { useState, memo } from 'react';
import { signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import { login } from '../lib/auth';

import styles from '../styles/home.module.scss';
import { IUser } from '../interfaces/common';
import { getServerSideProps } from '../pages';

const LoginForm = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [user, setUser] = useState<IUser>({ username: '', password: '' });
  const contentType = 'application/json';

  const getUser = async (user: IUser) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(user),
      });

      // Throw error with status code in case Fetch API req failed
      if (res.status === 200) {
        const { token } = await res.json();
        login({ token }, true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    getUser(user);
  };
  // const doValidate = () => {

  // }

  const getStyle = (name: string) => {
    if (name === 'Facebook') {
      return styles.Facebook;
    } else {
      return styles.GitHub;
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.titleLogin}>Login</h1>
      <form className={styles.loginForm} autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            className={styles.textInput}
            name="username"
            type="text"
            placeholder="username..."
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            className={styles.textInput}
            name="password"
            type="password"
            placeholder="password..."
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className={styles.bottomForm}>
          <button className={styles.button}>
            <p className={styles.loginText}>Sign in</p>
          </button>
          {providers &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)} className={getStyle(provider.name)}>
                  <p className={styles.loginText}>Sign in with {provider.name}</p>
                </button>
              </div>
            ))}
          <div className={styles.register}>
            <Link href="/register">
              <a className={styles.registerText}>Register</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(LoginForm);
