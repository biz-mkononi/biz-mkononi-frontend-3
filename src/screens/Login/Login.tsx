import React, { useState } from "react"
import "./Login.css"
import image2 from "../../Assets/logo.png"
import image3 from "../../Assets/ai-1.svg"
import image4 from "../../Assets/customer 1.svg"
import image5 from "../../Assets/insight 1.svg"
import image6 from "../../Assets/business-and-finance 1.svg"
import { TextField, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material"
import { forgotPassword, changePassword, login, registerUser, verifyPhone } from "../../Data/Auth/Data"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInputs {
    name: string,
    email: string,
    code: string,
    phone: string,
    password: string,
    password2: string,
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


const Login = () => {
    const navigate = useNavigate()
    const initialState = { code: "", password: "", phone: "", password2: "" }
    const [isSignup, setIsSignup] = useState(false)
    const [isResetPassword, setIsResetPassword] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const [recoverPassword, setRecoverPassword] = useState(false)
    const [passwordRecovered, setPasswordRecovered] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [dataErrors, setDataErrors] = useState<any>([])
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        resolver: yupResolver(schema)
    });

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    const resetPassword = () => {
        setIsResetPassword(true)
    }


    const onForgotPassword = () => {
        forgotPassword(setDataErrors, formData)
        setRecoverPassword(true)
    }

    const changingPassword = () => {
        changePassword(setDataErrors, formData)
        setPasswordRecovered(true)
    }

    const phoneVerification = () => {
        verifyPhone(formData)
        navigate(0)
    }

    const backToLogin = () => {
        setIsSignup(false)
    }

    const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
        setIsSigningIn(true)
        e.preventDefault()
        console.log(formData)
        login(setDataErrors, formData, navigate, setIsSigningIn)

    }

    const onSubmit = (data: IFormInputs) => {
        setIsRegistering(true)
        registerUser(setDataErrors, data, setIsRegistering, setIsVerified)

    };




    return (
        <div className="container-fluid login">
            <img src="" alt="" />
            <div className="row padding">
                <div className="col-lg-6 col-sm-12">
                    <div className="container login-banner">
                        <div style={{ display: "flex" }}>
                            <img src={image2} className="img-fluid" alt="..." />
                            <h5 className="font-medium leading-tight text-xl mt-0 mb-2 " style={{ padding: "20px" }}>BizMkononi</h5>
                        </div>


                        <p>Biz Mkononi is an AI powered insights platform that provides decision making tools, solutions and analytics to the small and medium enterprises in Kenya and the rest of the world.</p>
                        <div className="mb-4" style={{ display: "flex" }}>
                            <img src={image3} className="img-fluid" alt="..." />
                            <p>AI Powered Business Intelligence</p>
                        </div>

                        <div className="mb-4" style={{ display: "flex" }}>
                            <img src={image4} className="img-fluid" alt="..." />
                            <p>360° Customer view</p>
                        </div>

                        <div className="mb-4" style={{ display: "flex" }}>
                            <img src={image5} className="img-fluid" alt="..." />
                            <p>100% Business Insights</p>
                        </div>

                        <div className="mb-4" style={{ display: "flex" }}>
                            <img src={image6} className="img-fluid" alt="..." />
                            <p>Revenue Projection Charts</p>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className="sign-container">

                        {
                            isSignup ?
                                <div className="container">
                                    <div className="card login-card ">
                                        {
                                            isVerified ?
                                                <>
                                                    <h3 className="mt-2 mb-5 text-center " style={{ fontWeight: "bold" }}>Verify Phone</h3>
                                                    <div className="mb-2 field">
                                                        <TextField id="outlined-basic" name="phone" value={formData.phone} onChange={handleChange} variant="filled" className="textfield mb-3" />
                                                    </div>
                                                    <div className="mb-2 field">
                                                        <TextField id="outlined-basic" label="Code" name="code" onChange={handleChange} variant="filled" className="textfield mb-3" />
                                                    </div>
                                                    <div className="mt-3 text-center sign-button">
                                                        <button className="btn btn-primary btn-md" onClick={phoneVerification}>Verify Phone</button>
                                                    </div>


                                                </>
                                                :
                                                <>
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
                                                        <div className="text-center" >
                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                                        </div>
                                                        <div className="text-center mt-3 sign-button">
                                                            {
                                                                isRegistering ? <button className="btn btn-primary btn-md" disabled>Registering</button> :
                                                                    <button className="btn btn-primary btn-md" >Register</button>


                                                            }
                                                        </div>
                                                        <div className="text-center mt-3">
                                                            <p>Already have an account yet? <a href="#" onClick={switchMode} >Sign In</a></p>
                                                        </div>
                                                        <div className="text-center mt-2">
                                                            <p>Resend Verification SMS? <a href="#" >Resend</a></p>
                                                        </div>
                                                        <div className=" text-center mt-2">
                                                            <p>Verify Phone? <a href="#" >Verify Phone</a></p>
                                                        </div>
                                                    </form>
                                                </>

                                        }

                                    </div>
                                </div> :
                                <div className="container">
                                    <div className="card login-card mt-5">

                                        <>
                                            {
                                                isResetPassword ?
                                                    <>
                                                        {
                                                            recoverPassword ?
                                                                <>
                                                                    {
                                                                        passwordRecovered ?
                                                                            <>
                                                                                <div className="card text-center p-11 mt-4 mb-20 " >
                                                                                    <div className="mt-5">
                                                                                        <a href="#" className="btn-primary btn btn-md" onClick={backToLogin}>Login</a>

                                                                                    </div>
                                                                                    <a className=" mt-5" href="" onClick={backToLogin}>Back to Login?</a>
                                                                                </div>

                                                                            </>
                                                                            :
                                                                            <>
                                                                                <h3 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Reset Password</h3>
                                                                                <div className="field mb-3">
                                                                                    <TextField id="outlined-basic" label="Phone" name="phone" onChange={handleChange} variant="filled" className="textfield mb-3" />
                                                                                </div>
                                                                                <div className="field mb-3">
                                                                                    <TextField id="outlined-basic" label="Code" name="code" onChange={handleChange} variant="filled" className="textfield mb-3" />
                                                                                </div>
                                                                                <div className="mb-2 field">
                                                                                    <TextField id="outlined-basic" label="new password" onChange={handleChange} type={showPassword ? 'text' : 'password'} name="password"
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
                                                                                </div>
                                                                                <div className="mb-2 field">
                                                                                    <TextField id="outlined-basic" label="Confirm Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} name="password2" variant="filled"
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
                                                                                </div>
                                                                                <div className="mt-3 text-center sign-button">
                                                                                    <button className="btn btn-primary btn-md" onClick={changingPassword}>Reset Password</button>
                                                                                </div>
                                                                            </>

                                                                    }

                                                                </>
                                                                :
                                                                <>
                                                                    <h3 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Forgot Password</h3>
                                                                    <div className="field mb-3">
                                                                        <TextField id="outlined-basic" label="Phone" name="phone" onChange={handleChange} variant="filled" className="textfield mb-3" />
                                                                    </div>
                                                                    <div className="mt-3 text-center sign-button">
                                                                        <button className="btn btn-primary btn-md" onClick={onForgotPassword}>Submit</button>
                                                                    </div>
                                                                </>
                                                        }


                                                    </>
                                                    :
                                                    <>
                                                        <h3 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Sign In</h3>
                                                        <form onSubmit={onSubmitData}>
                                                            <div className="field mb-3">
                                                                <TextField id="outlined-basic" label="Phone" name="phone" onChange={handleChange} variant="filled" className="textfield mb-3" required />
                                                                <p className="text-danger">{errors.phone?.message}</p>
                                                            </div>

                                                            <div className="mb-3 field">
                                                                <TextField id="outlined-basic" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} name="password" required
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
                                                            <div className="text-center mb-2">
                                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                                                <p className="mt-3"> <a href="#" onClick={resetPassword}>Forgot password?</a> </p>
                                                            </div>
                                                            <div className="mt-3 text-center sign-button">
                                                                {
                                                                    isSigningIn ? <button className="btn btn-primary btn-md" disabled>Signing In</button> :
                                                                        <button className="btn btn-primary btn-md" >Sign In</button>
                                                                }

                                                            </div>
                                                        </form>
                                                        <div className="text-center mt-3">
                                                            <p>Don't have an account yet? <a href="#" onClick={switchMode}>Sign Up</a></p>
                                                        </div>
                                                    </>

                                            }
                                        </>

                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login