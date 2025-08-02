import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/login', formData);
      
      if (response.data.success) {
        // Call the login handler from parent component
        onLogin(response.data.token);
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">
        <i className="fas fa-sign-in-alt me-2"></i>Login
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            minLength="6"
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-block w-100 mb-3">
          Login
        </button>
      </form>
      
      <p className="text-center mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;