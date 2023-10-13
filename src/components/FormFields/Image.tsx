import React from 'react'
import image from '../../Assets/placeholder.jpg';

type Data = {
  imageUrl: string;
};
type Props = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayImage: string;
  label: string;
  update?: boolean;
  data?: Data;
};

const Image = ({
  handleFileChange,
  displayImage,
  label,
  update,
  data,
}: Props) => {
  return (
    <div className="mb-3 image-upload">
      <label htmlFor="formFile" className="form-label">
        Click to {update ? 'update' : 'set'} {label} image
        {update ? (
          <img
            src={
              displayImage === ''
                ? data?.imageUrl === null
                  ? image
                  : data?.imageUrl
                : displayImage
            }
            alt=""
            className="business-form-image"
          />
        ) : (
          <img
            src={displayImage === '' ? image : displayImage}
            alt=""
            className="business-form-image"
          />
        )}
      </label>
      <input
        className="form-control file "
        name="image"
        type="file"
        id="formFile"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Image;
