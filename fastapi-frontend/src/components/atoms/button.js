import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, text, color }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  
  const buttonStyle = {
    backgroundColor: isHovered ? 'gray' : color,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
    transition: 'background-color 0.3s ease-in-out',
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setDisplayText('Saved');
    setTimeout(() => {
      setDisplayText(text);
    }, 1000);
  };

  return (
    <button style={buttonStyle} onMouseOver = {handleHover} onMouseOut = {handleMouseLeave} onClick={() => {
      handleClick();
      onClick(); 
    }}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: '#3498db', // Default color if not specified
};

export default Button;