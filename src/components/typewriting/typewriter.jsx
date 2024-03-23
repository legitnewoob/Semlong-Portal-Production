import React, { useState, useEffect } from 'react';
import './typewrite.css'; // Import the CSS file for styling

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="typewriter-container">
      {currentText.split('').map((char, index) => (
        <span
          key={index}
          style={{ animationDelay: `${index * delay}ms` }}
          className={`typewriter-char ${index === currentText.length - 1 ? 'last' : ''}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default Typewriter;
