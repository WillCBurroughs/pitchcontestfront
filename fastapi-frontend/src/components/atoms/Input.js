import React from 'react';

const Input = ({ value, onChange, holder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder = {holder}
    />
  );
};

export default Input;