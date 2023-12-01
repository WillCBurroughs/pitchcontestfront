import React from 'react';

const Input = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by name..."
    />
  );
};

export default Input;