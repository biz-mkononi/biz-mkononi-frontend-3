import React, { useContext, useState } from 'react'
import "./Login.css"
import { TextField, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material"
import { login, } from "../../Data/Auth/Data"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useNavigate } from "react-router-dom"
import GetForgotPasswordCode from './GetForgotPasswordCode';
import { DataContext } from '../../context/ContextProvider';

interface functions {
    switchmode: any,
}
const LoginPage = ({ switchmode }: functions) => {
    const navigate = useNavigate()
    const initialState = { code: "", password: "", phone: "", password2: "" }
    const [showPassword, setShowPassword] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isGetForgotPasswordCode, setIsGetForgotPasswordCode] = useState(false)

    const { setLoggedUser } = useContext(DataContext)
    const [formData, setFormData] = useState(initialState)
    const [dataErrors, setDataErrors] = useState<any>([])

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmitLoginData = (e: React.FormEvent<HTMLFormElement>) => {
        setIsSigningIn(true)
        e.preventDefault()
        console.log(formData)
        login(setDataErrors, formData, navigate, setIsSigningIn, setLoggedUser)

    }

    const forgotPassword = () => setIsGetForgotPasswordCode(true)
    return (
        <React.Fragment>

            {
                isGetForgotPasswordCode ? <GetForgotPasswordCode /> :
                    <React.Fragment>
                        <h3 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Sign In</h3>
                        <form onSubmit={onSubmitLoginData}>
                            <div className="field mb-3">
                                <TextField id="outlined-basic" label="Phone" name="phone" onChange={handleChange} variant="filled" className="textfield mb-3" required />
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

                            </div>
                            <div className="text-center mb-2">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                <p className="mt-3"> <a href="#" onClick={forgotPassword} >Forgot password?</a> </p>
                            </div>
                            <div className="mt-3 text-center sign-button">
                                {
                                    isSigningIn ? <button className="btn btn-primary btn-md" disabled>Signing In</button> :
                                        <button className="btn btn-primary btn-md" >Sign In</button>
                                }

                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>Don't have an account yet? <a href="#" onClick={switchmode}>Sign Up</a></p>
                        </div>
                    </React.Fragment>
            }

        </React.Fragment>
    )
}

export default LoginPage