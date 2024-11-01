import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { domain } from './content/content.ts';

// Aplica una clase al body según el valor de domain
document.body.classList.add(`domain-${domain.toLowerCase()}`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
