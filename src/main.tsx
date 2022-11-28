import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

import { DataProvider } from './context/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <Router>
      <App />
    </Router>
  </DataProvider>

)
