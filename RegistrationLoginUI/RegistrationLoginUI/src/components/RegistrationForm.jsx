import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useAuth } from '../auth/AuthContext';

const RegistrationForm = () => {
  const [form, setForm] = useState({ username: '', password: '', verifyPassword: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', form);
      setMessage('User registered successfully');
      login(response.data); // Update with actual user data
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="verifyPassword" placeholder="Verify Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
