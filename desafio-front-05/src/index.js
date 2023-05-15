import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes';
import { UserProvider } from './context/UserContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

