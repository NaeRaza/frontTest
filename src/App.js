import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/acceuil" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

