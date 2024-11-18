import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import '../Businesses/AddBusiness.css';
import FormsLayout from '../../Layout/FormsLayout';
// import Image from '../../components/FormFields/Image';
import useAddEmployee from '../../hooks/Employees/useAddEmployee';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateEmployeeSchema } from '../../utils/schemas/LoginValidation';
import Input from '../../components/FormFields/FormattedInput';

type AddEmployeeFormInputs = {
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  position: string;
};
// eslint-disable-next-line
const NewEmployee = ({ id }: any) => {
  //TODO: const [displayImage, setDisplayImage] = useState('');

  const { mutateAsync, isLoading } = useAddEmployee();
  const methods = useForm<AddEmployeeFormInputs>({
    resolver: yupResolver(CreateEmployeeSchema),
    defaultValues: {
      phone: '',
      name: '',
      email: '',
      idNumber: '',
      position: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  //TODO: const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({...formData, [e.target.name]: e.target.files[0]});
  //     setDisplayImage(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  const onSubmit = async (data: AddEmployeeFormInputs) => {
    const post = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      idNumber: data.idNumber,
      position: data.position,
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
  console.log('Form Errors:', errors);

  return (
    <FormsLayout title="Employee">
      <Card className="p-3">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row padding mt-3">
              <div className="col-lg-4">
                <Input
                  icon={<BusinessIcon />}
                  label="Name"
                  register={register}
                  error={errors.name}
                  name="name"
                  placeholder="name"
                  type="text"
                />
              </div>
              <div className="col-lg-4">
                <Input
                  icon={<EmailIcon />}
                  label="Email"
                  register={register}
                  error={errors.email}
                  name="email"
                  placeholder="email"
                  type="email"
                />
              </div>
              <div className="col-lg-4">
                <Input
                  icon={<PhoneIcon />}
                  label="Phone"
                  register={register}
                  error={errors.phone}
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
                  register={register}
                  error={errors.idNumber}
                  name="idNumber"
                  placeholder="id number"
                  type="text"
                />
              </div>
              <div className="col-lg-4">
                <Input
                  icon={<StarsIcon />}
                  label="Position"
                  register={register}
                  error={errors.position}
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
        </FormProvider>
      </Card>
    </FormsLayout>
  );
};

export default NewEmployee;
