import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import './App.css';

function App() {
  return (
      <div className="App">
        <Routes >
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
