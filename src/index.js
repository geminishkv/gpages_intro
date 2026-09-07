import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
