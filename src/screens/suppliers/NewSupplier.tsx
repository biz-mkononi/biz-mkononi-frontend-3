import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import '../Businesses/AddBusiness.css';
import FormsLayout from '../../Layout/FormsLayout';
import Input from '../../components/FormFields/Input';
import TextArea from '../../components/FormFields/TextArea';
import useAddSupplier from '../../hooks/Supplier/useAddSupplier';
import { toast } from 'react-toastify';
// eslint-disable-next-line
const AddSupplier = ({ id }: any) => {
  const initialState = {
    name: '',
    phone: '',
    email: '',
    description: '',
    image: {},
  };
  //TODO: const [displayImage, setDisplayImage] = useState('');
  const [formData, setFormData] = useState(initialState);
  const { mutateAsync, isLoading } = useAddSupplier();

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      description: formData.description,
      // image: formData.image,
      businessId: id,
    };
    await mutateAsync(post)
      .then(() => {
        toast.success('Supplier added successfully', {
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
        toast.error('There was an error adding the supplier', {
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
    <FormsLayout title="Supplier">
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-4">
              <Input
                icon={<PersonIcon />}
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
                placeholder="phone"
                type="text"
              />
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-4">
              <TextArea handleDescriptionChange={handleDescriptionChange} />
            </div>
            {/*TODO: <div className="col-lg-4">
              <Image
                handleFileChange={handleFileChange}
                displayImage={displayImage}
                label="Supplier"
              />
            </div> */}
          </div>
          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'adding' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </Card>
    </FormsLayout>
  );
};

export default AddSupplier;
