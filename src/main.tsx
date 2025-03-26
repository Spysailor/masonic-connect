
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './i18n'; // Import des traductions en premier
import './index.css'

// Wrap the app render in a try-catch to handle potential errors
const renderApp = () => {
  try {
    createRoot(document.getElementById("root")!).render(<App />);
  } catch (error) {
    console.error("Failed to render app:", error);
    // Render a fallback UI if the main app fails to load
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 2rem; text-align: center;">
          <h1 style="color: #333;">Application Error</h1>
          <p>There was a problem loading the application. Please try refreshing the page.</p>
        </div>
      `;
    }
  }
};

// Wait for translations to load before rendering the app
document.addEventListener('DOMContentLoaded', renderApp);
