import React, {useState} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Card} from '@mui/material';
import './AddBusiness.css';
import BusinessList from './BusinessList';
import {addBusiness} from '../../Data/Businesses/Data';
import {useNavigate} from 'react-router-dom';
import FormsLayout from '../../Layout/FormsLayout';
import Image from '../../components/FormFields/Image';
import Input from '../../components/FormFields/Input';
import Location from '../../components/FormFields/Location';
import Select from '../../components/FormFields/Select';
import TextArea from '../../components/FormFields/TextArea';

const AddBusiness = () => {
  const [displayImage, setDisplayImage] = useState('');
  const initialState = {
    name: '',
    businessEmail: '',
    businessPhone: '',
    location: '',
    locationDetails: '',
    productType: '',
    description: '',
    longitude: 12,
    latitude: 13,
    image: {},
  };
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({...formData, [e.target.name]: e.target.files[0]});
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };
 // eslint-disable-next-line
  const handleSelect = (place: any) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {placeId: place.value.place_id},
      // eslint-disable-next-line
      (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const {lat, lng} = results[0].geometry.location;
          setFormData({
            ...formData,
            latitude: lat(),
            longitude: lng(),
            location: place.label,
          });
        }
      }
    );
  };

  const onClickActive = () => {
    setIsActive(true);
    setIsActive2(false);
  };
  const onClickActive2 = () => {
    setIsActive(false);
    setIsActive2(true);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBusiness(formData, navigate, setIsLoading);
  };

  return (
    <FormsLayout
      title="Business"
      business
      onClickActive2={onClickActive2}
      onClickActive={onClickActive}
      isActive={isActive}
      isActive2={isActive2}>
      {isActive ? (
        <BusinessList />
      ) : (
        <>
          <Card className="p-3">
            <form onSubmit={onSubmit}>
              <div className="row padding mt-3">
                <div className="col-lg-4">
                  <Input
                    icon={<BusinessIcon />}
                    label="Business Name"
                    handleChange={handleChange}
                    name="name"
                    placeholder="name"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <Input
                    icon={<EmailIcon />}
                    label="Business Email"
                    handleChange={handleChange}
                    name="businessEmail"
                    placeholder="email"
                    type="email"
                  />
                </div>
                <div className="col-lg-4">
                  <Input
                    icon={<PhoneIcon />}
                    label="Business Phone"
                    handleChange={handleChange}
                    name="businessPhone"
                    placeholder="phone"
                    type="text"
                  />
                </div>
              </div>
              <div className="row padding">
                <div className="col-lg-4">
                  <Location handleSelect={handleSelect} />
                </div>
                <div className="col-lg-4">
                  <Input
                    icon={<LocationOnIcon />}
                    label="Location Details"
                    handleChange={handleChange}
                    name="locationDetails"
                    placeholder="details"
                    type="text"
                  />
                </div>
                <div className="col-lg-4">
                  <Select handleTypeChange={handleTypeChange} />
                </div>
              </div>
              <div className="row padding">
                <div className="col-lg-4">
                  <TextArea handleDescriptionChange={handleDescriptionChange} />
                </div>
                <div className="col-lg-4">
                  <Image
                    handleFileChange={handleFileChange}
                    label="Business"
                    displayImage={displayImage}
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  disabled={isLoading ? true : false}>
                  {isLoading ? 'Adding' : 'Add Business'}
                </button>
              </div>
            </form>
          </Card>
        </>
      )}
    </FormsLayout>
  );
};

export default AddBusiness;
