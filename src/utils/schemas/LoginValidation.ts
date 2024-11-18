// src/validationSchemas/validationSchema.ts
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
  password: Yup.string().required('Password is required'),
});
export const resendCodeSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
});
export const VerifyPhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
  code: Yup.string().required('code is required'),
});
export const ResetPasswordSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
  code: Yup.string().required('Code is required'),
  password: Yup.string().required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
export const CreateBusinessSchema = Yup.object().shape({
  name: Yup.string().required('Business name is required'),
  businessPhone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
  businessEmail: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('Business email is required'),
  location: Yup.string().required('Location is required'),
  latitude: Yup.number()
    .required('Latitude is required')
    .typeError('Latitude must be a number'),
  longitude: Yup.number()
    .required('Longitude is required')
    .typeError('Longitude must be a number'),
  locationDetails: Yup.string().required('Location details are required'),
  productType: Yup.string().required('Product type is required'),
  description: Yup.string().required('Description is required'),
});
export const CreateSupplierSchema = Yup.object().shape({
  name: Yup.string().required('Supplier name is required'),
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('Supplier email is required'),
  description: Yup.string().required('Description is required'),
});
export const CreateEmployeeSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('email is required'),
  idNumber: Yup.string().required('Id number is required'),
  position: Yup.string().required('Position is required'),
});
export const CreateCustomerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  gender: Yup.string()
    .oneOf(['MALE', 'FEMALE'], 'Please select a valid gender')
    .required('Gender is required'),
  yearOfBirth: Yup.string()
    .matches(/^\d{4}$/, 'Year of birth must be exactly 4 digits')
    .required('Year of birth is required'),

  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must be 10 digits and start with 0')
    .required('Phone number is required'),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('Email is required'),

  description: Yup.string().required('Description is required'),
});
