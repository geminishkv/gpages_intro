import { useState } from 'react';
import './styles/App.css';
import './styles/CardBase.css';
import { LangProvider } from './context/LangContext';
import SplashScreen from './components/SplashScreen';
import MainPage     from './components/MainPage';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <LangProvider>
      <div className="app">
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
        <MainPage isVisible={splashDone} />
      </div>
    </LangProvider>
  );
}
