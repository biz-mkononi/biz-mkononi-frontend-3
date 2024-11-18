import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card, FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import '../Businesses/AddBusiness.css';
import PersonIcon from '@mui/icons-material/Person';
import FormsLayout from '../../Layout/FormsLayout';
import useAddCustomers from '../../hooks/Customers/useCreateCustomer';
import { toast } from 'react-toastify';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCustomerSchema } from '../../utils/schemas/LoginValidation';
import Input from '../../components/FormFields/FormattedInput';
import TextArea from '../../components/FormFields/FormattedDescription';
type AddCustomerFormInputs = {
  name: string;
  email: string;
  phone: string;
  description: string;
  yearOfBirth: string;
  gender: string;
};
// eslint-disable-next-line
const AddCustomer = ({ id }: any) => {
  //TODO: const [displayImage, setDisplayImage] = useState('');
  const { mutateAsync, isLoading } = useAddCustomers();
  const methods = useForm<AddCustomerFormInputs>({
    resolver: yupResolver(CreateCustomerSchema),
    defaultValues: {
      phone: '',
      name: '',
      email: '',
      description: '',
      gender: 'MALE',
      yearOfBirth: '',
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  //TODO: const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = async (data: AddCustomerFormInputs) => {
    const post = {
      ...data,
      // image: formData.image,
      businessId: id,
    };
    console.log(post);
    await mutateAsync(post)
      .then(() => {
        toast.success('Customer was added successfully', {
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
        toast.error('Customer with this phone number is already registered', {
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
    <FormsLayout title="Customer">
      <Card className="p-3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row padding mt-3">
              <div className="col-lg-4">
                <Input
                  icon={<PersonIcon />}
                  label="Name"
                  name="name"
                  placeholder="name"
                  type="text"
                  register={register}
                  error={errors.name}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  icon={<PersonIcon />}
                  label="year of Birth"
                  name="yearOfBirth"
                  placeholder="year of birth"
                  type="text"
                  register={register}
                  error={errors.yearOfBirth}
                />
              </div>
              <div className="col-lg-4">
                <FormControl component="fieldset" error={!!errors.gender}>
                  <label htmlFor="basic-url" className="form-label">
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
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
                    )}
                  />
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="row padding">
              <div className="col-lg-4">
                <Input
                  icon={<EmailIcon />}
                  label="Email"
                  name="email"
                  placeholder="email"
                  type="email"
                  register={register}
                  error={errors.email}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  icon={<PhoneIcon />}
                  label="Phone"
                  name="phone"
                  placeholder="phone number"
                  type="text"
                  register={register}
                  error={errors.phone}
                />
              </div>
            </div>
            <div className="row padding">
              <div className="col-lg-4">
                <TextArea name="description" />
              </div>
              {/*TODO: <div className="col-lg-4">
              <Image
                handleFileChange={handleFileChange}
                displayImage={displayImage}
                label="Customer"
              />
            </div> */}
            </div>

            <div className="text-center mt-3">
              <button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                disabled={isLoading}
              >
                {isLoading ? 'Adding' : 'Add Customer'}
              </button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </FormsLayout>
  );
};

export default AddCustomer;
