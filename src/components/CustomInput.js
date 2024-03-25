import React, { useState } from 'react';
import "../assets/style/customInput.css"

const CustomInput = ({ label, placeholder, validate }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
    validateInput(value);
  };

  const validateInput = (value) => {
    if (validate) {
      const error = value;
      setError(error);
    }
  };

  return (
    <div className="custom-input">
      <label className="custom-input-label">{label}</label>
      <input
        className="custom-input-field"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <span className="custom-input-error" style={{visibility: error ? "visable" : "hidden"}}>{error}</span>
    </div>
  );
};

export default CustomInput;
