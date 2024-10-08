import React, { useState } from 'react';
import { Card } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScaleIcon from '@mui/icons-material/Scale';
import StyleIcon from '@mui/icons-material/Style';
import { getCategory } from '../../Data/Categories/Data';
import CategoryIcon from '@mui/icons-material/Category';

import '../Businesses/AddBusiness.css';
import FormsLayout from '../../Layout/FormsLayout';
import { useQuery } from '@tanstack/react-query';
import useAddProduct from '../../hooks/Products/useAddProduct';
import { toast } from 'react-toastify';
type Categories = {
  name: string;
};
// eslint-disable-next-line
const AddProduct = ({ id }: any) => {
  const initialState = {
    name: '',
    categoryId: '',
    productType: '',
    size: '',
    unit: '',
    buyingPrice: '',
    sellingPrice: '',
    description: '',
    tags: '',
    image: {},
  };

  const [formData, setFormData] = useState(initialState);
  //TODO: const [displayImage, setDisplayImage] = useState('');
  // eslint-disable-next-line
  const { data: categories } = useQuery<Categories[] | any, Error>({
    queryKey: ['categories', id],
    queryFn: () => getCategory(id),
  });
  const { mutateAsync, isLoading } = useAddProduct();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, ['categoryId']: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //TODO: const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      name: formData.name,
      categoryId: formData.categoryId,
      productType: formData.productType,
      size: formData.size,
      unit: formData.unit,
      buyingPrice: formData.buyingPrice,
      sellingPrice: formData.sellingPrice,
      description: formData.description,
      tags: formData.tags,
      businessId: id,
      // image: formData.image, //TODO: add image handling
    };
    await mutateAsync(post)
      .then(() => {
        toast.success('Product added successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch(() => {
        toast.error('There was an error adding the product', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <FormsLayout title="Product">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label ">
                Name
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ProductionQuantityLimitsIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  className="form-control"
                  placeholder="name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label">
                Category
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <CategoryIcon />
                </span>
                <select
                  className="form-select"
                  onChange={handleCategoryChange}
                  name="category"
                  aria-label="Default select example"
                  id="basic-addon1"
                >
                  <option selected>Select category</option>
                  {// eslint-disable-next-line
                  categories?.map((category: any) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label">
                Product Type
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ProductionQuantityLimitsIcon />
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
                  <option value="SERVICE_PRODUCT">Service/product</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label ">
                Size e.g 500
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ScaleIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="size"
                  className="form-control"
                  placeholder="Size e.g 500"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label">
                Unit e.g. ml for millilitres
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ScaleIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="unit"
                  className="form-control"
                  placeholder="Unit e.g. ml for millilitres"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label">
                Buying Price e.g 1000
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ShoppingCartIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="buyingPrice"
                  className="form-control"
                  placeholder="Buying Price e.g 1000"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className=" row padding">
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Selling Price e.g 1000
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ShoppingCartIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="sellingPrice"
                  className="form-control"
                  placeholder="Selling Price e.g 1000"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Tags
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <StyleIcon />
                </span>
                <input
                  type="text"
                  onChange={handleChange}
                  name="tags"
                  className="form-control"
                  placeholder="tags"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <label htmlFor="basic-url" className="form-label ">
                Description
              </label>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  onChange={handleDescriptionChange}
                  name="description"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
            {/*TODO: <div className="col-lg-4">
              <Image
                handleFileChange={handleFileChange}
                displayImage={displayImage}
                label="Product"
              />
            </div> */}
          </div>

          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Adding' : 'Add Product'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default AddProduct;
