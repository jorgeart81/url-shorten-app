export const NotFoundView = () => {
  return (
    <main className='w-dvw h-dvh content-center'>
      <div className='h-12 flex justify-center items-center'>
        <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          404
        </h1>
        <div className='pl-4 ml-4 h-12 border-l-[1px] border-gray-50/75 content-center'>
          <h2 className='text-sm leading-none'>
            This page could not be found.
          </h2>
        </div>
      </div>
    </main>
  );
};
