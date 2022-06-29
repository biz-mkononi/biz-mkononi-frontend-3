import React, { useState } from "react"
import "./Login.css"
import image1 from "../../Assets/Group 2.svg"
import image2 from "../../Assets/logo.png"
import image3 from "../../Assets/ai-1.svg"
import image4 from "../../Assets/customer 1.svg"
import image5 from "../../Assets/insight 1.svg"
import image6 from "../../Assets/business-and-finance 1.svg"
import { TextField, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material"
import { login, register, verifyPhone } from "../../Data/Auth/Data"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Login = () => {
    const initialState = { name: "", email: "", password: "", phone: "", password2: "" }
    const [isSignup, setIsSignup] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [errors, setErrors] = useState<any>([])
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    const verifyPhoneNumber = () => {
        setIsRegistered(true)
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSignup) {
            register(setErrors, formData)
        }
        else {
            login(setErrors, formData)
        }
        // verifyPhone(formData.phone)
    }
    return (
        <div className="container-fluid login">
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
                    {
                        isSignup ?
                            <div className="container">
                                {/* <img src={image1} className="img-fluid login-img" alt="..." /> */}
                                <div className="card login-card ">
                                    <h3 className="mt-3 mb-3 text-center">Create an Account</h3>
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-2 field">
                                            <TextField id="standard-basic" label="Name" name="name" onChange={handleChange} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="standard-basic" label="Phone" name="phone" onChange={handleChange} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="standard-basic" label="email" name="email" onChange={handleChange} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="standard-basic" label="Password" type={showPassword ? 'text' : 'password'} name="password"
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
                                                onChange={handleChange} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="mb-2 field">
                                            <TextField id="standard-basic" label="Confirm Password" type={showPassword ? 'text' : 'password'} name="password2" variant="standard"
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
                                                onChange={handleChange} className="textfield mb-3" />
                                        </div>
                                        <div className="text-center" >
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                        </div>
                                        <div className="text-center mt-3 sign-button">
                                            <button className="btn btn-primary btn-md" onClick={verifyPhoneNumber}>Register</button>
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
                                </div>
                            </div> :
                            <div className="container">
                                {/* <img src={image1} className="img-fluid login-img" alt="..." /> */}
                                <div className="card login-card mt-5">
                                    <h3 className="mt-3 mb-3 text-center">Sign In</h3>
                                    <form onSubmit={onSubmit}>
                                        <div className="field mb-3">
                                            <TextField id="standard-basic" label="Phone" name="phone" onChange={handleChange} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="mb-3 field">
                                            <TextField id="standard-basic" label="Password" type={showPassword ? 'text' : 'password'} name="password"
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
                                                onChange={handleChange} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="text-center mb-2">
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                            <p className="mt-3">Forgot password?</p>
                                        </div>
                                        <div className="mt-3 text-center sign-button">
                                            <button className="btn btn-primary btn-md">Sign In</button>
                                        </div>
                                    </form>
                                    <div className="text-center mt-3">
                                        <p>Don't have an account yet? <a href="#" onClick={switchMode}>Sign Up</a></p>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>

    )
}

export default Login