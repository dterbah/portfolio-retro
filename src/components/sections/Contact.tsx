import React from 'react';

const Contact = () => {
  return (
    <div className="section">
      <h2>Contact</h2>
      <div className="contact-info">
        <a href="mailto:dterbah@gmail.com" className="contact-link">
          <span className="contact-label">Email:</span> dterbah@gmail.com
        </a>
        <a href="https://github.com/dterbah" target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="contact-label">GitHub:</span> github.com/dterbah
        </a>
        <a href="https://www.linkedin.com/in/dterbah/" target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="contact-label">LinkedIn:</span> linkedin.com/in/dterbah
        </a>
      </div>
    </div>
  );
};

export default Contact; 