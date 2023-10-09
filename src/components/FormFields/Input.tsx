import React from 'react'

interface InputProps {
  icon: React.ReactElement
  label: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  placeholder: string
  type: string
}
const Input: React.FC<InputProps> = ({
  icon,
  label,
  handleChange,
  name,
  placeholder,
  type,
}) => {
  return (
    <>
      <label htmlFor="basic-url" className="form-label ">
        {label}
      </label>
      <div className="input-group mb-5">
        <span className="input-group-text" id="basic-addon1">
          {icon}
        </span>
        <input
          type={type}
          onChange={handleChange}
          name={name}
          className="form-control"
          placeholder={placeholder}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
    </>
  )
}

export default Input
