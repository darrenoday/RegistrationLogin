import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Nopage from './components/Nopage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
