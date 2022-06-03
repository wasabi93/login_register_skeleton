import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { logout, withAuthSync } from '../lib/auth';

import styles from '../styles/register.module.scss';

const Status = () => {
  const { data: session } = useSession();

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (session) {
      signOut();
    } else {
      logout();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.loginContainer}>
          <h1 className={styles.titleLogin}>Login success</h1>
          <div className={styles.register}>
            <a>
              <button onClick={handleLogout}>Log out</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthSync(Status);
