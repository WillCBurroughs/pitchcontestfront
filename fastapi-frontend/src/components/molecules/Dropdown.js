import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>Select an option:</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Please Select --</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && <p>Selected option: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;