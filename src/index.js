import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Mengimpor file CSS (pastikan sudah ada)
import App from './App';  // Mengimpor komponen utama App
import { BrowserRouter as Router } from 'react-router-dom'; // Untuk routing

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
