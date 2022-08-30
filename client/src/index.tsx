import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import ErrorBoundary from './components/errorBoundary';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    <StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
