import { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/CardBase.css';
import './styles/GlitchLabel.css';
import { LangProvider } from './context/LangContext';
import SplashScreen, { shouldShowSplash } from './components/SplashScreen';
import MainPage     from './components/MainPage';

export default function App() {
  const [splashDone, setSplashDone] = useState(() => !shouldShowSplash());
  // The page fades in one frame after the splash is gone (or right away when there is
  // no splash), so .main-page--visible is added to an already painted page and its
  // opacity transition runs instead of the page popping in.
  const [pageVisible, setPageVisible] = useState(false);
  useEffect(() => {
    if (!splashDone) return undefined;
    const id = requestAnimationFrame(() => setPageVisible(true));
    return () => cancelAnimationFrame(id);
  }, [splashDone]);

  return (
    <LangProvider>
      <div className="app">
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
        <MainPage isVisible={pageVisible} />
      </div>
    </LangProvider>
  );
}
