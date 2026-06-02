import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ onSignIn, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Successful login/register
      onSignIn(data.user);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page-container">
      <div className="signin-header">
        <div className="logo-container" onClick={() => onNavigate('HOME')}>
          <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="site-logo-circle" style={{ width: '110px', height: '110px' }} />
        </div>
      </div>

      <div className="signin-card-wrapper">
        <div className="signin-card">
          <h2 className="signin-title">Sign in</h2>
          <p className="signin-subtitle">Sign in or create an account</p>

          {/* Continue with shop button */}
          <button className="continue-shop-btn" onClick={() => onNavigate('HOME')}>
            Continue with shop
          </button>

          <div className="divider-container">
            <span className="divider-text">or</span>
          </div>

          <form onSubmit={handleSubmit} className="signin-form" autoComplete="off">
            {error && <div className="signin-error">{error}</div>}

            <div className="input-group">
              <input
                type="email"
                id="email"
                className={`signin-input ${email ? 'has-value' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
              <label htmlFor="email" className="input-label">Email Address</label>
            </div>

            <div className="input-group password-group">
              <input
                type="password"
                id="password"
                className={`signin-input ${password ? 'has-value' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <label htmlFor="password" className="input-label">Password</label>
              
              <button 
                type="submit" 
                className={`submit-arrow-btn ${email && password ? 'active' : ''}`}
                disabled={loading}
                aria-label="Submit Sign In"
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            </div>
          </form>

          <div className="signin-footer-links">
            <span>By continuing, you agree to our </span>
            <span className="underline-link" onClick={() => onNavigate('HOME')}>Terms of service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
