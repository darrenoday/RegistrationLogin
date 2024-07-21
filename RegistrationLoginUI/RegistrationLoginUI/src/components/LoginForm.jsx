import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('Login successful');
        setUsername('');
        setPassword('');
        
        // Redirect to "NoPage" or any other page after successful login
        navigate('/nopage');
      } else {
        const data = await response.json();
        setMessage(data.message); // Assuming the error message is sent as { message: 'error message' }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error during login');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
