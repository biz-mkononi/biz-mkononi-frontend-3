import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

import {DataProvider} from './context/ContextProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <Router>
        <App />
      </Router>
    </DataProvider>
  </QueryClientProvider>
);
