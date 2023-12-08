import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ iconSource, text, color, onClick }) => {
  const buttonStyle = {
    backgroundColor: color,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundImage: `url(${iconSource})`, 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    paddingLeft: '30px', 
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

Icon.propTypes = {
  iconSource: PropTypes.string.isRequired, 
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Icon;