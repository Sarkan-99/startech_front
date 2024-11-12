import React from 'react';
import './checkbox/Checkbox.css'; // Import the CSS for your custom checkbox

const Checkbox = ({ id, name, value, onChange, checked }) => {
  // Local state to handle checked/unchecked status
  const handleCheckboxChange = () => {
    onChange(value);
  };

  return (
    <div className="checkbox-wrapper-31">
      <input 
        type="checkbox" 
        id={id} 
        name={name} 
        value={value} 
        onChange={handleCheckboxChange} 
        checked={checked} 
        style={{ opacity: 0 }} // Hide the native checkbox but keep its functionality
      />
      <svg viewBox="0 0 35.6 35.6">
        <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
        <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
        <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
