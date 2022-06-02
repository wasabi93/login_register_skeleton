import Link from 'next/link';
import React, { useState, memo } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/register.module.scss';
import { IUser } from '../interfaces/common';

const LoginForm = () => {
  const contentType = 'application/json';
  const [user, setUser] = useState<IUser>({ username: '', password: '' });
  const [statusRegister, setStatusRegister] = useState<boolean>(true);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    const postUser = async (user: IUser) => {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(user),
        });

        // Throw error with status code in case Fetch API req failed
        if (res.status === 200) {
          router.push('/');
          setStatusRegister(true);
        } else {
          setStatusRegister(false);
        }
      } catch (error) {
        setStatusRegister(false);
        console.log(error);
      }
    };
    e.preventDefault();
    postUser(user);
  };

  const onChangeUsername = (e: { target: { value: string } }) => {
    setUser({ ...user, username: e.target.value });
    setStatusRegister(true);
  };

  const onChangePassword = (e: { target: { value: string } }) => {
    setUser({ ...user, password: e.target.value });
    setStatusRegister(true);
  };

  // const doValidate = () => {

  // }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h1 className={styles.titleLogin}>Register</h1>
          <form className={styles.loginForm} autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className={styles.input}>
              <input
                className={styles.textInput}
                name="username"
                type="text"
                placeholder="username..."
                onChange={onChangeUsername}
              />
              <input
                className={styles.textInput}
                name="password"
                type="password"
                placeholder="password..."
                onChange={onChangePassword}
              />
            </div>
            {statusRegister === false && <p style={{ color: 'red' }}>Please try again!</p>}
            <div className={styles.bottomForm}>
              <button className={styles.button}>
                <p className={styles.loginText}>Register</p>
              </button>
              <div className={styles.register}>
                <Link href="/">
                  <a className={styles.extraText}>Login</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginForm);
