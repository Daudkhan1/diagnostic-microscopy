import React, { useState } from 'react';
import '../styles/ContactUs.scss';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // State to show confirmation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission
    // --- TODO: Implement actual form submission logic here ---
    // (e.g., send data to an API endpoint)
    console.log('Form data submitted:', formData);

    // Simulate submission feedback
    setIsSubmitted(true);
  };

  return (
    <div className='contactus'>
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p className="intro-text">
        Have questions, feedback, or need support? Fill out the form below, and our team will get back to you as soon as possible.
      </p>

      {isSubmitted ? (
        <div className="confirmation-message">
          Thank you for your message! We'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Full Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Please write your detailed message here..."
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default ContactUs;