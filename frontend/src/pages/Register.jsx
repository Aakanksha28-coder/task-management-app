import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password
      });
      
      if (response.data.success) {
        // Call the login handler from parent component
        onLogin(response.data.token);
        toast.success('Registration successful!');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">
        <i className="fas fa-user-plus me-2"></i>Register
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
        
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            minLength="6"
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-block w-100 mb-3">
          Register
        </button>
      </form>
      
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;