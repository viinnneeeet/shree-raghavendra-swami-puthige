import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true); // this reloads the page with the new service worker
    }
  },
  onOfflineReady() {
    alert('The app is ready to use offline!');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
