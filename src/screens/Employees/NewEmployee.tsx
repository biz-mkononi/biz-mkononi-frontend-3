import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import '../Businesses/AddBusiness.css';
import FormsLayout from '../../Layout/FormsLayout';
// import Image from '../../components/FormFields/Image';
import Input from '../../components/FormFields/Input';
import useAddEmployee from '../../hooks/Employees/useAddEmployee';
import { toast } from 'react-toastify';
// eslint-disable-next-line
const NewEmployee = ({ id }: any) => {
  const initialState = {
    name: '',
    phone: '',
    email: '',
    idNumber: '',
    position: '',
    image: {},
  };

  const [formData, setFormData] = useState(initialState);
  //TODO: const [displayImage, setDisplayImage] = useState('');

  const { mutateAsync, isLoading } = useAddEmployee();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //TODO: const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({...formData, [e.target.name]: e.target.files[0]});
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      idNumber: formData.idNumber,
      position: formData.position,
      businessId: id,
    };
    await mutateAsync(post)
      .then(() => {
        toast.success('Employee added successfully', {
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
        toast.error('There was an error when adding the employee', {
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
    <FormsLayout title="Employee">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-4">
              <Input
                icon={<BusinessIcon />}
                label="Name"
                handleChange={handleChange}
                name="name"
                placeholder="name"
                type="text"
              />
            </div>
            <div className="col-lg-4">
              <Input
                icon={<EmailIcon />}
                label="Email"
                handleChange={handleChange}
                name="email"
                placeholder="email"
                type="email"
              />
            </div>
            <div className="col-lg-4">
              <Input
                icon={<PhoneIcon />}
                label="Phone"
                handleChange={handleChange}
                name="phone"
                placeholder="phone number"
                type="text"
              />
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <Input
                icon={<EmailIcon />}
                label="Id Number"
                handleChange={handleChange}
                name="idNumber"
                placeholder="id number"
                type="text"
              />
            </div>
            <div className="col-lg-4">
              <Input
                icon={<StarsIcon />}
                label="Position"
                handleChange={handleChange}
                name="position"
                placeholder="position"
                type="text"
              />
            </div>
          </div>
          {/*TODO: <Image
            handleFileChange={handleFileChange}
            displayImage={displayImage}
            label="Employee"
          /> */}
          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Adding' : 'Add Employee'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default NewEmployee;
