import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Nopage from './components/Nopage';
import NavBar from './components/NavBar';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedComponent from './components/ProtectedComponent';
import LoginStatus from './components/LoginStatus';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <LoginStatus /> {/* Add LoginStatus component */}
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/protected" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
