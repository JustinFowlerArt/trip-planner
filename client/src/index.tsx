import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app';

import ErrorBoundary from './components/errorBoundary';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);