import React from 'react';

type Props = {
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const TextArea = ({handleDescriptionChange}: Props) => {
  return (
    <>
      <label htmlFor="basic-url" className="form-label ">
        Description
      </label>
      <div className="input-group mb-3">
        <textarea
          className="form-control"
          onChange={handleDescriptionChange}
          name="description"
          aria-label="With textarea"></textarea>
      </div>
    </>
  );
};

export default TextArea;
