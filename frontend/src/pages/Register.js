import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phonenumber: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phonenumber)) {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }

    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (users.some(user => user.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        phonenumber: formData.phonenumber,
        role: formData.role
      };

      // Add user to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Redirect to login
      navigate('/login', { 
        state: { message: 'Registration successful! Please log in.' }
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Join Crave and Create</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              minLength="2"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              placeholder="+1234567890"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              disabled={isLoading}
            />
          </div>
          <div className="role-select">
            <label>Register as</label>
            <div 
              className={`role-option ${formData.role === 'user' ? 'selected' : ''}`}
              onClick={() => handleChange({ target: { name: 'role', value: 'user' } })}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label>
                <FontAwesomeIcon icon={faUser} /> Food Enthusiast
              </label>
            </div>
            <div 
              className={`role-option ${formData.role === 'chef' ? 'selected' : ''}`}
              onClick={() => handleChange({ target: { name: 'role', value: 'chef' } })}
            >
              <input
                type="radio"
                name="role"
                value="chef"
                checked={formData.role === 'chef'}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label>
                <FontAwesomeIcon icon={faUtensils} /> Professional Chef
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
