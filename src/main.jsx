import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import ContextProvider from './context/Context.jsx'
import  'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
      <App />
  </ContextProvider>,
)
