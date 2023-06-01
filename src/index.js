import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
