import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextAreaProps {
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name }) => {
  const { register } = useFormContext(); // Accessing the register function

  return (
    <>
      <label htmlFor={name} className="form-label">
        Description
      </label>
      <div className="input-group mb-3">
        <textarea
          {...register(name)}
          className="form-control"
          name={name}
          aria-label="With textarea"
          id={name}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;
