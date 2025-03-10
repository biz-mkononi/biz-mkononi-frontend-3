import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Card } from '@mui/material';
import './AddBusiness.css';
import BusinessList from './BusinessList';
import FormsLayout from '../../Layout/FormsLayout';
// import Location from '../../components/FormFields/Location';
import useAddBusiness from '../../hooks/Businesses/useAddBusiness';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateBusinessSchema } from '../../utils/schemas/LoginValidation';
import Input from '../../components/FormFields/FormattedInput';
import Location from '../../components/FormFields/FormattedLocation';
import Select from '../../components/FormFields/FormattedSelect';
import TextArea from '../../components/FormFields/FormattedDescription';
import { AddBusinessFormInputs } from '../../utils/types/BusinessTypes';

const AddBusiness = () => {
  //TODO: const [displayImage, setDisplayImage] = useState('');

  const { mutateAsync, isLoading } = useAddBusiness();
  const methods = useForm<AddBusinessFormInputs>({
    resolver: yupResolver(CreateBusinessSchema),
    defaultValues: {
      businessPhone: '',
      name: '',
      businessEmail: '',
      location: '',
      locationDetails: '',
      productType: '',
      description: '',
      longitude: 0.0,
      latitude: 0.0,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);

  const onClickActive = () => {
    setIsActive(true);
    setIsActive2(false);
  };
  const onClickActive2 = () => {
    setIsActive(false);
    setIsActive2(true);
  };
  const onSubmit = async (data: AddBusinessFormInputs) => {
    await mutateAsync(data)
      .then(() => {
        toast.success('Business added successfully', {
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
        toast.error('There was an error adding the business', {
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
    <FormsLayout
      title="Business"
      business
      onClickActive2={onClickActive2}
      onClickActive={onClickActive}
      isActive={isActive}
      isActive2={isActive2}
    >
      {isActive ? (
        <BusinessList />
      ) : (
        <>
          <Card className="p-3">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row padding mt-3">
                  <div className="col-lg-4">
                    <Input
                      icon={<BusinessIcon />}
                      label="Business Name"
                      name="name"
                      placeholder="name"
                      type="text"
                      register={register}
                      error={errors.name}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Input
                      icon={<EmailIcon />}
                      label="Business Email"
                      name="businessEmail"
                      placeholder="email"
                      type="email"
                      register={register}
                      error={errors.businessEmail}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Input
                      icon={<PhoneIcon />}
                      label="Business Phone"
                      name="businessPhone"
                      placeholder="phone"
                      type="text"
                      register={register}
                      error={errors.businessPhone}
                    />
                  </div>
                </div>
                <div className="row padding">
                  <div className="col-lg-4">
                    <Location name="location" />
                  </div>
                  <div className="col-lg-4">
                    <Input
                      icon={<LocationOnIcon />}
                      label="Location Details"
                      name="locationDetails"
                      placeholder="details"
                      type="text"
                      register={register}
                      error={errors.locationDetails}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="productType" />
                  </div>
                </div>
                <div className="row padding">
                  <div className="col-lg-4">
                    <TextArea name="description" />
                  </div>
                  {/* TODO: <div className="col-lg-4">
                  <Image
                    handleFileChange={handleFileChange}
                    label="Business"
                    displayImage={displayImage}
                  />
                </div> */}
                </div>
                <div className="text-center mt-3">
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding..' : 'Add Business'}
                  </button>
                </div>
              </form>
            </FormProvider>
          </Card>
        </>
      )}
    </FormsLayout>
  );
};

export default AddBusiness;
