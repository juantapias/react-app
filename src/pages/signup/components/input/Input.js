import React from 'react';
import './Input.css';

const Input = ({ attr, onChange, param }) => (
  <input
    id={attr.id}
    name={attr.name}
    type={attr.type}
    placeholder={attr.placeholder}
    className={param ? "input-signup-error" : "input-signup-default"}
    onChange={(e) => onChange(e.target.name, e.target.value)}
  />
);

export default Input;