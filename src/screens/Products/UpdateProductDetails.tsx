import React, {useState} from 'react';
import {Card} from '@mui/material';
import '../Businesses/AddBusiness.css';
import {useNavigate, useParams} from 'react-router-dom';
import {getSingleProduct, updateSingleProduct} from '../../Data/Products/Data';
import CircularProgress from '@mui/material/CircularProgress';
import CategoryIcon from '@mui/icons-material/Category';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScaleIcon from '@mui/icons-material/Scale';
import StyleIcon from '@mui/icons-material/Style';
import {getCategory} from '../../Data/Categories/Data';
import Image from '../../components/FormFields/Image';
import FormsLayout from '../../Layout/FormsLayout';
import { useQuery } from '@tanstack/react-query';

interface data {
  name: '';
  productType: '';
  size: '';
  unit: '';
  buyingPrice: '';
  sellingPrice: '';
  stock: '';
}
type Categories = {
  name: string;
};
// eslint-disable-next-line
const UpdateProductDetails = ({id}: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  // eslint-disable-next-line
  const [category, setCategory] = useState<data | any>({});
  const [displayImage, setDisplayImage] = useState('');
 // eslint-disable-next-line
  const {data: categories,isLoading:categoriesLoading} = useQuery<Categories[] | any, Error>({
    queryKey: ['categories', id],
    queryFn: () => getCategory(id),
  });

  const params = useParams();
  // eslint-disable-next-line
  const {data: products,isLoading:productsLoading} = useQuery<Categories[] | any, Error>({
    queryKey: ['single',params.id,id],
    queryFn: () => getSingleProduct(params.id,id),
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, ['categoryId']: e.target.value});
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({...formData, [e.target.name]: e.target.files[0]});
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleProduct(formData, navigate, params.id, setIsUpdating, id);
  };
  if (productsLoading || categoriesLoading) {
    return  <div className="text-center">
          <CircularProgress color="success" />
        </div>
  }
  console.log(products);

  return (

        <FormsLayout title="Product" update>
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
                      defaultValue={products.name}
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
                      value={products.category.id}
                      aria-label="Default select example"
                      id="basic-addon1">

                      <option selected>{products.category.name}</option>
                      {
                        // eslint-disable-next-line
                      categories.map((category:any) => {
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
                      value={products.productType}
                      name="productType"
                      aria-label="Default select example"
                      id="basic-addon1">
                      <option selected>{products.productType}</option>
                      <option value="PRODUCT">Product</option>
                      <option value="SERVICE">Service</option>
                      <option value="SERVICE_PRODUCT">Service_product</option>
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
                      defaultValue={products.size}
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
                      defaultValue={products.unit}
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
                      defaultValue={products.buyingPrice}
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
                      defaultValue={products.sellingPrice}
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
                      defaultValue={products.tags}
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
                      defaultValue={products.description}
                      onChange={handleDescriptionChange}
                      name="description"
                      aria-label="With textarea"></textarea>
                  </div>
                </div>
                <div className="col-lg-4">
                  <Image
                    handleFileChange={handleFileChange}
                    update
                    displayImage={displayImage}
                    label="Product"
                    data={products}
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}>
                  {isUpdating ? 'updating' : 'Update Product'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
  );
};

export default UpdateProductDetails;
