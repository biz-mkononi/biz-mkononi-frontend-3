import React, { useEffect } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Card } from '@mui/material';
import './AddBusiness.css';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import FormsLayout from '../../Layout/FormsLayout';
import useGetSingleBusiness from '../../hooks/Businesses/useGetSingleBusiness';
import { FormProvider, useForm } from 'react-hook-form';
import { AddBusinessFormInputs } from '../../utils/types/BusinessTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateBusinessSchema } from '../../utils/schemas/LoginValidation';
import Input from '../../components/FormFields/FormattedInput';
import Location from '../../components/FormFields/FormattedLocation';
import Select from '../../components/FormFields/FormattedSelect';
import TextArea from '../../components/FormFields/FormattedDescription';
import useUpdateBusiness from '../../hooks/Businesses/useUpdateBusiness';
import { toast } from 'react-toastify';

const UpdateBusinessDetails = () => {
  const params = useParams();
  const { data, isLoading: businessLoading } = useGetSingleBusiness(
    params.id || '',
  );
  const { mutateAsync, isLoading: updateLoading } = useUpdateBusiness();
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
      longitude: 0,
      latitude: 0,
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;
  useEffect(() => {
    if (data) {
      reset({
        businessPhone: data.businessPhone,
        name: data.name,
        businessEmail: data.businessEmail,
        location: data.location,
        locationDetails: data.locationDetails,
        productType: data.productType,
        description: data.description,
        longitude: data.longitude,
        latitude: data.latitude,
      });
    }
  }, [data, reset]);
  const onSubmit = async (data: AddBusinessFormInputs) => {
    const post = { ...data, id: params.id || '' };
    await mutateAsync(post)
      .then(() => {
        toast.success('Business updated successfully', {
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
        toast.error('There was an error updating the business', {
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
  if (businessLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="success" />
      </div>
    );
  }
  console.log(data);
  return (
    <FormsLayout title="Business" update>
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
              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {updateLoading ? 'Updating..' : 'Update Business'}
              </button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </FormsLayout>
  );
};

export default UpdateBusinessDetails;
