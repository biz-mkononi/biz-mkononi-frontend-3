import React, {useEffect, useState} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import {Card} from '@mui/material';
import '../Businesses/AddBusiness.css';
import {useNavigate, useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import {
  getSingleEmployee,
  updateSingleEmployee,
} from '../../Data/Employees/Data';
import StarsIcon from '@mui/icons-material/Stars';
import Image from '../../components/FormFields/Image';
import FormsLayout from '../../Layout/FormsLayout';

interface data {
  name: '';
  email: '';
  phone: '';
  description: '';
}
// eslint-disable-next-line
const EmployeeUpdateDetails = ({id}: any) => {
  // eslint-disable-next-line
  const [data, setData] = useState<data | any>({});
  const [isLoading, setIsloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayImage, setDisplayImage] = useState('');
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getSingleEmployee(setData, params.id, setIsloading, setFormData, id);
  }, []);
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({...formData, [e.target.name]: e.target.files[0]});
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSingleEmployee(formData, params.id, navigate, setIsUpdating, id);
    console.log(formData);
  };
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <FormsLayout title="Employee" update>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <div className="row padding mt-3">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label ">
                    Name
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <BusinessIcon />
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
                  <label htmlFor="basic-url" className="form-label ">
                    Email
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <EmailIcon />
                    </span>
                    <input
                      type="email"
                      onChange={handleChange}
                      defaultValue={data.email}
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
                    Phone
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <PhoneIcon />
                    </span>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={data.phone}
                      name="phone"
                      className="form-control"
                      placeholder="phone number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row padding">
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label ">
                    ID Number
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <EmailIcon />
                    </span>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={data.idNumber}
                      name="idNumber"
                      className="form-control"
                      placeholder="id number"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <label htmlFor="basic-url" className="form-label">
                    Position
                  </label>
                  <div className="input-group mb-5">
                    <span className="input-group-text" id="basic-addon1">
                      <StarsIcon />
                    </span>
                    <input
                      type="text"
                      onChange={handleChange}
                      defaultValue={data.position}
                      name="position"
                      className="form-control"
                      placeholder="position"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <Image
                handleFileChange={handleFileChange}
                update
                displayImage={displayImage}
                label="Employee"
                data={data}
              />
              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isUpdating ? true : false}>
                  {isUpdating ? 'updating' : 'Update Employee'}
                </button>
              </div>
            </form>
          </Card>
        </FormsLayout>
      )}
    </>
  );
};

export default EmployeeUpdateDetails;
