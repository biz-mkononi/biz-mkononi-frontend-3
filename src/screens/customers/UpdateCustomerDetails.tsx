import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import '../Businesses/AddBusiness.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSingleCustomer,
  updateSingleCustomer,
} from '../../Data/Customers/Data';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import FormsLayout from '../../Layout/FormsLayout';

interface data {
  name: '';
  email: '';
  phone: '';
  description: '';
  yearOfBirth: '';
  gender: '';
}
// eslint-disable-next-line
const UpdateCustomerDetails = ({ id }: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  //TODO: const [displayImage, setDisplayImage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const params = useParams();

  useEffect(() => {
    getSingleCustomer(setData, params.id, setIsloading, setFormData, id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //TODO: const handlFileeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleCustomer(formData, params.id, navigate, setIsUpdating, id);
  };
  console.log(formData);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Customer" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <div className="row padding mt-3">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label ">
                    Name
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <PersonIcon />
                    </span>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={data.name}
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
                    Year Of Birth
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <PersonIcon />
                    </span>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={data.yearOfBirth}
                      name="yearOfBirth"
                      className="form-control"
                      placeholder="year of birth"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <FormControl>
                    <label htmlFor="basic-url" className="form-label">
                      Gender
                    </label>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={data.gender}
                      name="gender"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="FEMALE"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="MALE"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="row padding mt-3">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Customer Email
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
                    Customer Phone
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
                    handleFileChange={handlFileeChange}
                    update
                    displayImage={displayImage}
                    label="Customer"
                    data={data}
                  />
                </div> */}
              </div>
              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}
                >
                  {isUpdating ? 'updating' : 'Update Customer'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  );
};

export default UpdateCustomerDetails;
