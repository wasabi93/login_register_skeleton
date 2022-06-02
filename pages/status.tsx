import Link from 'next/link';
import React from 'react';
import { logout, withAuthSync } from '../lib/auth';

import styles from '../styles/register.module.scss';

const Status = () => {
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h1 className={styles.titleLogin}>Login success</h1>
          <div className={styles.register}>
            <Link href="/">
              <a>
                <button onClick={handleLogout}>Log out</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthSync(Status);
