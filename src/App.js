// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Impor HomePage
import CategoryPage from './pages/CategoryPage';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';  // Impor Navbar

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6">
        <Switch>
          <Route exact path="/" component={HomePage} />  {/* HomePage */}
          <Route path="/tasks" component={TaskPage} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
