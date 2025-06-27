import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ConfiguratorProvider } from './context/ConfiguratorContext';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfiguratorProvider>
        <App />
      </ConfiguratorProvider>
    </BrowserRouter>
  </React.StrictMode>
);