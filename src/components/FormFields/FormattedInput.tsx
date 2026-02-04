/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputProps {
  icon: React.ReactElement;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({
  icon,
  label,
  name,
  placeholder,
  type,
  register,
  error,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text" id={`${name}-addon`}>
          {icon}
        </span>
        <input
          {...register(name)}
          type={type}
          id={name}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          aria-label={label}
          aria-describedby={`${name}-addon`}
        />
        {error && <div className="invalid-feedback">{error.message}</div>}
      </div>
    </>
  );
};

export default Input;
