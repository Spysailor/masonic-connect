
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './i18n'; // Import des traductions en premier
import './index.css'

// Attendre que les traductions soient chargées pour éviter des problèmes d'affichage
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById("root")!).render(<App />);
});
