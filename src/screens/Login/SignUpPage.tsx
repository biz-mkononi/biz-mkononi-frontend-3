import React, { useState } from 'react'
import { TextField, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material"
import { registerUser, resendVerification } from "../../Data/Auth/Data"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./Login.css"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import VerifyPhone from './VerifyPhone';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
    name: string,
    email: string,
    code: string,
    phone: string,
    password: string,
    password2: string,
}
interface functions {
    switchmode: any
}


const schema = yup.object().shape({
    name: yup.string()
        .required("First Name is required")
        .min(3, "First Name must be at least 3 characters")
        .max(112, "First Name should not exceed 12 characters"),

    email: yup.string()
        .required("Email is required")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid"),
    phone: yup.string()
        .required("Phone Number is required"),

    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(16, "password should not exceed 16 characters"),
    password2: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must and should match"),
});

const SignUpPage = ({ switchmode }: functions) => {
    const navigate = useNavigate()
    const [isRegistering, setIsRegistering] = useState(false)
    const [dataErrors, setDataErrors] = useState<any>([])
    const [showPassword, setShowPassword] = useState(false);
    const [isVerified, setIsVerified] = useState(false)
    const [isResendCode, setIsResendCode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const initialState = { code: "", password: "", phone: "", password2: "" }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const handleShowPassword = () => setShowPassword(!showPassword);
    const verifyPhoneNumber = () => setIsVerified(true)
    const resendVerificationCode = () => setIsResendCode(true)


    const onSubmit = (data: IFormInputs) => {
        setIsRegistering(true)
        registerUser(setDataErrors, data, setIsRegistering, setIsVerified)

    };

    const resendCode = () => {
        setIsLoading(true)
        resendVerification(formData, setIsLoading, setDataErrors, navigate)
    }
    console.log(dataErrors)
    return (
        <React.Fragment>
            {
                isVerified ? <VerifyPhone /> :
                    <>
                        {
                            isResendCode ?
                                <React.Fragment>

                                    <h3 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Resend Code</h3>
                                    {
                                        dataErrors && (
                                            <p className="text-center text-danger mb-3">{dataErrors}</p>
                                        )
                                    }
                                    <div className="field mb-3">
                                        <TextField id="outlined-basic" label="Phone" name="phone" onChange={handleChange} variant="filled" className="textfield mb-3" />
                                    </div>
                                    <div className="mt-3 text-center sign-button">
                                        {
                                            isLoading ? <button className="btn btn-primary btn-md" disabled>resending</button> :
                                                <button className="btn btn-primary btn-md" onClick={resendCode}>Resend</button>

                                        }
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <h3 className="mt-2 mb-5 text-center " style={{ fontWeight: "bold" }}>Create an Account</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-2 field">
                                            <TextField id="outlined-basic" label="Name" {...register("name")} variant="filled" className="textfield mb-3" />
                                            <p className="text-danger">{errors.name?.message}</p>
                                        </div>

                                        <div className="mb-2 field">
                                            <TextField id="outlined-basic" label="Phone" {...register("phone")} variant="filled" className="textfield mb-3" />
                                            <p className="text-danger">{errors.phone?.message}</p>
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="outlined-basic" label="email" {...register("email")} variant="filled" className="textfield mb-3" />
                                            <p className="text-danger">{errors.email?.message}</p>
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="outlined-basic" label="Password" type={showPassword ? 'text' : 'password'} {...register("password")}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                {
                                                                    showPassword ? <VisibilityOff onClick={handleShowPassword} /> : <Visibility onClick={handleShowPassword} />
                                                                }

                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="filled" className="textfield mb-3" />
                                            <p className="text-danger">{errors.password?.message}</p>
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="outlined-basic" label="Confirm Password" type={showPassword ? 'text' : 'password'} {...register("password2")} variant="filled"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                {
                                                                    showPassword ? <VisibilityOff onClick={handleShowPassword} /> : <Visibility onClick={handleShowPassword} />
                                                                }

                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                className="textfield mb-3" />
                                            <p className="text-danger">{errors.password2?.message}</p>
                                        </div>
                                        <div className="text-center mt-3 sign-button">
                                            {
                                                isRegistering ? <button className="btn btn-primary btn-md" disabled>Registering</button> :
                                                    <button className="btn btn-primary btn-md" >Register</button>


                                            }
                                        </div>
                                        <div className="text-center mt-3">
                                            <p>Already have an account yet? <a href="#" onClick={switchmode}  >Sign In</a></p>
                                        </div>
                                        <div className="text-center mt-2">
                                            <p>Resend Verification SMS? <a href="#" onClick={resendVerificationCode}>Resend</a></p>
                                        </div>
                                        <div className=" text-center mt-2">
                                            <p>Verify Phone? <a href="#" onClick={verifyPhoneNumber} >Verify Phone</a></p>
                                        </div>
                                    </form>
                                </React.Fragment>
                        }
                    </>

            }

        </React.Fragment>
    )
}

export default SignUpPage