import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
