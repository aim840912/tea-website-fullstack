import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

import ScrollToTop from './shared/utils/ScrollToTop';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop />
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
