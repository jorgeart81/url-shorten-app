import './App.css';
import { useLanguage } from './components/hooks/useLanguage';
import { Button } from './components/ui/button';

function App() {
  const { translate } = useLanguage();

  return (
    <>
      <h1 className='text-3xl font-bold underline'>{translate('welcome')}</h1>
      <div className='flex min-h-svh flex-col items-center justify-center'>
        <Button>{translate('clickMe')}</Button>
      </div>
    </>
  );
}

export default App;
