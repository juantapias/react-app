import React from 'react';
import './Input.css';

const Input = ({attr, params, onChange}) => (
  <input
    id={attr.id}
    type={attr.type}
    name={attr.name}
    placeholder={attr.placeholder}
    className={ params ? "input-login-error" : "input-login-default"}
    onChange={(e) => onChange(e.target.name, e.target.value)}
  />
);

export default Input;