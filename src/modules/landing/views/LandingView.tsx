import type { FC } from 'react';

export const LandingView: FC = () => (
  <main>
    <header className='relative flex flex-col justify-center text-center border-1 min-h-[calc(100vh-112px)]'>
      <h1
        className='relative text-3xl font-bold mb-4 mt-16'
        style={{ fontSize: 'max(24px, min(3.75vw, 48px))' }}
      >
        Welcome to URL Shorten App
      </h1>

      <div className='relative flex flex-col items-center'>
        <p className='mb-4 text-xl'>
          Create, manage, and share your short links easily.
        </p>
        <ul className='list-disc pl-6 w-fit text-left leading-7'>
          <li>Fast and secure link shortening</li>
          <li>Custom back-half support</li>
          <li>Link analytics and management</li>
        </ul>
      </div>
    </header>
  </main>
);
