//  src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importación de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getOperadores = () => {
  return axios.get(`${API_URL}/operadores`);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
