import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { changePassword } from "../../Data/Auth/Data"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
    const initialState = { code: "", password: "", phone: "", password2: "" }
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [dataErrors, setDataErrors] = useState<any>([])


    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const changingPassword = () => {
        setIsLoading(true)
        changePassword(setDataErrors, formData, setIsLoading, navigate)
    }

    return (
        <React.Fragment>
            <h3 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Reset Password</h3>
            <div className="field mb-3">
                <TextField id="outlined-basic" label="Phone" name="phone" value={formData.phone} onChange={handleChange} variant="filled" className="textfield mb-3" />
            </div>
            <div className="field mb-3">
                <TextField id="outlined-basic" label="Code" name="code" onChange={handleChange} variant="filled" className="textfield mb-3" required />
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
                    variant="filled" className="textfield mb-3" required />
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
                    className="textfield mb-3" required />
            </div>
            <div className="mt-3 text-center sign-button">
                {
                    isLoading ? <button className="btn btn-primary btn-md" disabled>Resetting Password</button> :
                        <button className="btn btn-primary btn-md" onClick={changingPassword}>Reset Password</button>
                }

            </div>
        </React.Fragment>
    )
}

export default ResetPassword