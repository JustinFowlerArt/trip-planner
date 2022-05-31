import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';

import ErrorBoundary from './components/errorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// TODO:
// Prevent duplicate trip IDs
// Modify trip names and expenses names and prices
// Modify API patch request to not send expense.template property
// Separate API into own branch and deploy to Heroku
