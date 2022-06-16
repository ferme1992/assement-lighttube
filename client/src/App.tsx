import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
