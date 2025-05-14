import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/passwordPrompt.scss';

const FIXED_PASSWORD = import.meta.env.VITE_PREVIEW_PASSWORD;

const PasswordPrompt = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!FIXED_PASSWORD) {
      console.error("FATAL ERROR: Preview password environment variable (VITE_PREVIEW_PASSWORD) not set or loaded correctly!");
      return (
          <div className="password-prompt-overlay">
              <div className="password-prompt-box">
                  <h2>Configuration Error</h2>
                  <p>The required application configuration (password) is missing. Please contact support.</p>
              </div>
          </div>
      );
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Use the password loaded from the environment variable
    if (password === FIXED_PASSWORD) {
      setError(''); // Clear any previous error
      onAuthenticate(); // Call the callback function passed from LivePreview
    } else {
      setError('Incorrect password. Please try again.'); // Set error message
      setPassword(''); // Clear the password input field on error
    }
  };

  // Render the password prompt modal
  return (
    <div className="password-prompt-overlay">
      <div className="password-prompt-box">
        <h2>Authorization Required</h2>
        <p>Please enter the password to access the Live Preview.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus // Automatically focus the input field when modal appears
              required
            />
          </div>
          {/* Display error message if authentication failed */}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Authorize
          </button>
        </form>
      </div>
    </div>
  );
};

// Define prop types for the component (requires 'prop-types' package)
PasswordPrompt.propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
};

export default PasswordPrompt;