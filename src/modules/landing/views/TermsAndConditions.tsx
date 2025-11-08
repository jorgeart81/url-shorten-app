import { env } from '@/config/env';

export const TermsAndConditions = () => {
  return (
    <main className='p-6'>
      <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
        Terms and Conditions
      </h1>
      <br />
      <section>
        <p>
          Welcome to {env.appName}. <br />
          By using this application, you agree to the following terms:
        </p>

        <ol className='my-6 ml-6 list-disc [&>li]:mt-2'>
          <li>
            <strong>Purpose</strong> <br />
            This app was developed as part of my personal portfolio to showcase
            my software development skills.
          </li>
          <li>
            <strong>Permitted use</strong> <br />
            You may use the app freely for personal or demo purposes. Commercial
            use or any activity that infringes on others’ rights is not allowed.
          </li>

          <li>
            <strong>Data and privacy</strong> <br />
            No sensitive personal data is collected. If the app asks for
            information (such as your email), it is used only to enable app
            functionality (e.g., password reset).
          </li>

          <li>
            <strong>Liability</strong> <br />
            The developer is not responsible for any damages or data loss
            resulting from the use of this app.
          </li>

          <li>
            <strong>Intellectual property</strong> <br />
            All source code, design, and content belong to the author and may
            not be reused without permission.
          </li>

          <li>
            <strong>Changes</strong> <br />
            These terms may be updated at any time without prior notice.
          </li>
        </ol>
      </section>
    </main>
  );
};
