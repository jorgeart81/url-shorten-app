import type { FC } from 'react';

import styles from './Landing.module.css';

export const LandingView: FC = () => (
  <main>
    <header className={`${styles.header}`}>
      <h1
        className='relative text-3xl font-bold mb-4 mt-16 z-10'
        style={{ fontSize: 'max(24px, min(3.75vw, 48px))' }}
      >
        Welcome to URL Shorten App
      </h1>

      <div className='relative flex flex-col items-center text-muted-foreground z-10'>
        <p className='mb-4 text-xl'>
          Create, manage, and share your short links easily.
        </p>
        <ul className='list-disc pl-6 w-fit text-left'>
          <li>Fast and secure link shortening</li>
          <li>Custom back-half support</li>
          <li>Link analytics and management</li>
        </ul>
      </div>
    </header>

    <section></section>
  </main>
);
