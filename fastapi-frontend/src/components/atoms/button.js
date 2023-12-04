import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, text, color }) => {
  const buttonStyle = {
    backgroundColor: color,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
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