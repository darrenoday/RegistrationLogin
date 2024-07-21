import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, verifyPassword }),
      });

      if (response.ok) {
        setMessage('Registration successful');
        setUsername('');
        setPassword('');
        setVerifyPassword('');
        
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        const data = await response.json();
        setMessage(data.message); // Assuming the error message is sent as { message: 'error message' }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Error during registration');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Verify Password:</label>
              <input
                type="password"
                className="form-control"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
