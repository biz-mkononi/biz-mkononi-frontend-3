import React, { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import '../Businesses/AddBusiness.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSingleSupplier,
  updateSingleSupplier,
} from '../../Data/Suppliers/Data';
import CircularProgress from '@mui/material/CircularProgress';
import FormsLayout from '../../Layout/FormsLayout';

interface data {
  name: '';
  email: '';
  phone: '';
  description: '';
}
// eslint-disable-next-line
const UpdateSupplierDetails = ({ id }: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  //TODO: const [displayImage, setDisplayImage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const params = useParams();

  useEffect(() => {
    getSingleSupplier(setData, params.id, setIsloading, setFormData, id);
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //TODO: const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({...formData, [e.target.name]: e.target.files[0]});
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleSupplier(formData, navigate, params.id, setIsUpdating, id);
  };
  console.log(formData);
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Supplier" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <div className="row padding mt-3">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label ">
                    Supplier Name
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <BusinessIcon />
                    </span>
                    <input
                      defaultValue={data.name}
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
                    Supplier Email
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <EmailIcon />
                    </span>
                    <input
                      defaultValue={data.email}
                      type="text"
                      onChange={handleChange}
                      name="email"
                      className="form-control"
                      placeholder="email"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Business Phone
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <PhoneIcon />
                    </span>
                    <input
                      defaultValue={data.phone}
                      type="text"
                      onChange={handleChange}
                      name="phone"
                      className="form-control"
                      placeholder="phone"
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
                      defaultValue={data.description}
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
                    update
                    displayImage={displayImage}
                    label="Supplier"
                    data={data}
                  />
                </div> */}
              </div>
              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}
                >
                  {isUpdating ? 'updating' : 'Update Supplier'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  );
};

export default UpdateSupplierDetails;
