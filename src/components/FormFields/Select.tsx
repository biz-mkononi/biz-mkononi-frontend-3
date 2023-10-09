import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits'
import React from 'react'

interface SelectProps {
  handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const Select: React.FC<SelectProps> = ({ handleTypeChange }) => {
  return (
    <div>
      <label htmlFor="basic-url" className="form-label">
        Product Type
      </label>
      <div className="input-group mb-5">
        <span className="input-group-text" id="basic-addon1">
          <ProductionQuantityLimits />
        </span>
        <select
          className="form-select"
          onChange={handleTypeChange}
          name="productType"
          aria-label="Default select example"
          id="basic-addon1"
        >
          <option selected>select a product type</option>
          <option value="PRODUCT">Product</option>
          <option value="SERVICE">Service</option>
          <option value="SERVICE_PRODUCT">Service_product</option>
        </select>
      </div>
    </div>
  )
}

export default Select
