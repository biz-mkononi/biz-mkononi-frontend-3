import React, { useState } from "react"
import "./Login.css"
import image1 from "../../Assets/Group 2.svg"
import image2 from "../../Assets/logo.png"
import image3 from "../../Assets/ai-1.svg"
import image4 from "../../Assets/customer 1.svg"
import image5 from "../../Assets/insight 1.svg"
import image6 from "../../Assets/business-and-finance 1.svg"
import { TextField, FormControlLabel, Checkbox, InputAdornment } from "@mui/material"
import { login, register, verifyPhone } from "../../Data/Data"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


const Login = () => {
    const initialState = { name: "", email: "", password: "", phone: "", password2: "" }
    const initialcode = { code: "" }
    const [isSignup, setIsSignup] = useState(false)
    const [errors, setErrors] = useState<any>([])
    const [isSigned, setIsSigned] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [nameErrors, setNameErrors] = useState<any>(true)
    const [emailErrors, setEmailErrors] = useState<any>(true)
    const [phoneErrors, setPhoneErrors] = useState<any>(true)
    const [open, setOpen] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [verificationCode, setVerificationCode] = useState(initialcode)



    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode({ ...verificationCode, [e.target.name]: e.target.value })

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "name") {
            console.log(e.target.value)
            if (e.target.value.length >= 4) {
                setNameErrors(false)
            }
        }
        if (e.target.name === "phone") {
            if (e.target.value.length >= 10) {
                setPhoneErrors(false)
            }
        }
        if (e.target.name === "email") {
            if (e.target.value.length > 0) {
                setEmailErrors(false)
            }
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    const verifyPhoneNumber = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const post = {
            phone: phoneNumber,
            code: verificationCode.code
        }
        verifyPhone(post)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSignup) {
            register(setErrors, setIsSigned, setIsLoading, setPhoneNumber, formData)
        }
        else {
            login(setErrors, setIsLoading, formData)
        }
        // verifyPhone(formData.phone)
    }
    console.log(errors)
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
                        isSigned ?
                            <div className="container">
                                <div className="card login-card mt-5">
                                    <h3 className="mt-3 mb-3 text-center">Verify your phone</h3>
                                    <form onSubmit={verifyPhoneNumber}>
                                        <div className="field mb-3">
                                            <TextField id="standard-basic" label="Phone" name="phone" value={phoneNumber} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="field mb-3">
                                            <TextField id="standard-basic" label="Code" name="code" onChange={handleVerificationCode} variant="standard" className="textfield mb-3" />
                                        </div>
                                        <div className="mt-3 text-center sign-button">
                                            <button className="btn btn-primary btn-md">Verify Phone</button>
                                        </div>

                                        <div className="text-center mt-2">
                                            <p>Did not get verification code? <a href="#" >Resend</a></p>
                                        </div>
                                        <div className=" text-center mt-2">
                                            <p>Already verified your account? <a href="#" >Login</a></p>
                                        </div>
                                        <div className="text-center mt-3">
                                            <p>No account? <a href="#"  >Sign Up</a></p>
                                        </div>


                                    </form>

                                </div>
                            </div>
                            :
                            <>

                                {
                                    isSignup ?
                                        <div className="container">
                                            {/* <img src={image1} className="img-fluid login-img" alt="..." /> */}
                                            {
                                                errors ?
                                                    <Box sx={{ width: '50%' }}>
                                                        <Collapse in={open}>
                                                            <Alert
                                                                action={
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        color="inherit"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            setOpen(false);
                                                                        }}
                                                                    >
                                                                        <CloseIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                }
                                                                sx={{ mb: 2 }}
                                                            >
                                                                {errors}
                                                            </Alert>
                                                        </Collapse>

                                                    </Box>
                                                    : ""
                                            }
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
                                                    {
                                                        nameErrors && emailErrors && phoneErrors ?
                                                            <div className="text-center mt-3 sign-button">
                                                                <button className="btn btn-primary btn-md" disabled >Register</button>
                                                            </div> :
                                                            <>
                                                                {
                                                                    isLoading ?
                                                                        <div className="text-center mt-3 sign-button">
                                                                            <button disabled className="btn btn-primary btn-md" >Registering</button>
                                                                        </div> :
                                                                        <div className="text-center mt-3 sign-button">
                                                                            <button className="btn btn-primary btn-md" >Register</button>
                                                                        </div>
                                                                }
                                                            </>

                                                    }

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
                                            {
                                                errors ?
                                                    <Box sx={{ width: '50%' }}>
                                                        <Collapse in={open}>
                                                            <Alert
                                                                action={
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        color="inherit"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            setOpen(false);
                                                                        }}
                                                                    >
                                                                        <CloseIcon fontSize="inherit" />
                                                                    </IconButton>
                                                                }
                                                                sx={{ mb: 2 }}
                                                            >
                                                                {errors}
                                                            </Alert>
                                                        </Collapse>

                                                    </Box>
                                                    : ""
                                            }
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
                                                    {
                                                        isLoading ?
                                                            <div className="mt-3 text-center sign-button">
                                                                <button disabled className="btn btn-primary btn-md">Signing In</button>
                                                            </div> :
                                                            <div className="mt-3 text-center sign-button">
                                                                <button className="btn btn-primary btn-md">Sign In</button>
                                                            </div>
                                                    }

                                                </form>
                                                <div className="text-center mt-3">
                                                    <p>Don't have an account yet? <a href="#" onClick={switchMode}>Sign Up</a></p>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </>
                    }


                </div>
            </div>
        </div>

    )
}

export default Login