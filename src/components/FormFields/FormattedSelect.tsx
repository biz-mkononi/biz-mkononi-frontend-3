import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectProps {
  name: string;
}

const Select: React.FC<SelectProps> = ({ name }) => {
  const { register } = useFormContext(); // Accessing the register function

  return (
    <div>
      <label htmlFor={name} className="form-label">
        Product Type
      </label>
      <div className="input-group mb-5">
        <span className="input-group-text" id={`${name}-addon`}>
          <ProductionQuantityLimits />
        </span>
        <select
          {...register(name)}
          className="form-select"
          aria-label="Default select example"
          id={`${name}-addon`}
        >
          <option value="">Select a product type</option>
          <option value="PRODUCT">Product</option>
          <option value="SERVICE">Service</option>
          <option value="SERVICE_PRODUCT">Service/Product</option>
        </select>
      </div>
    </div>
  );
};

export default Select;
