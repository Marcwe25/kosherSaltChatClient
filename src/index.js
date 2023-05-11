import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

import { AuthProvider } from './privateRoute/auth-context';
import App from './App'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider><App /></AuthProvider>
  </React.StrictMode>
);

