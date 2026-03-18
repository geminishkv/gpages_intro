import { useState } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import MainPage from './components/MainPage';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="app">
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <MainPage isVisible={splashDone} />
    </div>
  );
}
