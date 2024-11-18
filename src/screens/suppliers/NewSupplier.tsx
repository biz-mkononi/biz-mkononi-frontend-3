import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import '../Businesses/AddBusiness.css';
import FormsLayout from '../../Layout/FormsLayout';
import useAddSupplier from '../../hooks/Supplier/useAddSupplier';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateSupplierSchema } from '../../utils/schemas/LoginValidation';
import Input from '../../components/FormFields/FormattedInput';
import TextArea from '../../components/FormFields/FormattedDescription';
type AddSupplierFormInputs = {
  name: string;
  email: string;
  phone: string;
  description: string;
};
// eslint-disable-next-line
const AddSupplier = ({ id }: any) => {
  //TODO: const [displayImage, setDisplayImage] = useState('');
  const { mutateAsync, isLoading } = useAddSupplier();
  const methods = useForm<AddSupplierFormInputs>({
    resolver: yupResolver(CreateSupplierSchema),
    defaultValues: {
      phone: '',
      name: '',
      email: '',
      description: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: AddSupplierFormInputs) => {
    const post = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      description: data.description,
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
                  placeholder="phone"
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
        </FormProvider>
      </Card>
    </FormsLayout>
  );
};

export default AddSupplier;
