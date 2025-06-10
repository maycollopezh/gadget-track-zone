import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// 👇 Importaciones para el chatbot de n8n
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <div id="n8n-chat"></div> {/* Contenedor del chat */}
  </React.StrictMode>,
)

// 👇 Activación del chatbot
createChat({
  webhookUrl: 'https://maycollopez12.app.n8n.cloud/webhook/66d44111-3a1f-4b1f-9baa-af109e0554cc/chat', // Reemplaza con tu webhook real
  target: '#n8n-chat',
  mode: 'window', // O 'fullscreen'
  showWelcomeScreen: true,
  initialMessages: [
    '¡Hola! Bienvenido a GadgetZone 👋',
    '¿En qué puedo ayudarte hoy?'
  ],
  defaultLanguage: 'en',
})

createRoot(document.getElementById("root")!).render(<App />);