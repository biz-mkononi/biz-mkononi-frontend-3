import React, { useState } from 'react'
import { TextField, Alert } from "@mui/material"
import { forgotPassword } from "../../Data/Auth/Data"
import ResetPassword from './ResetPassword'


const GetForgotPasswordCode = () => {
    const initialState = { code: "", password: "", phone: "", password2: "" }

    const [dataErrors, setDataErrors] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isResetPassword, setIsResetPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onForgotPassword = () => {
        setIsLoading(true)
        forgotPassword(setDataErrors, formData, setIsLoading, setIsResetPassword)

    }
    return (
        <React.Fragment>
            {
                isResetPassword ? <ResetPassword /> :
                    <React.Fragment>
                        {
                            dataErrors !== '' && (
                                <Alert variant="filled" onClose={(() => setDataErrors(''))} severity="error">
                                    {dataErrors}
                                </Alert>
                            )
                        }
                        <h5 className="mt-3 mb-5 text-center" style={{ fontWeight: "bold" }}>Forgot Password</h5>
                        <div className="field mb-3">
                            <TextField id="standard-basic" label="Phone" name="phone" onChange={handleChange} variant="standard" className="textfield mb-3" />
                        </div>
                        <div className="mt-3 text-center sign-button">
                            {
                                isLoading ? <button className="btn btn-primary btn-md" disabled>Submitting</button> :
                                    <button className="btn btn-primary btn-md" onClick={onForgotPassword}>Submit</button>

                            }
                        </div>
                    </React.Fragment>
            }

        </React.Fragment>
    )
}

export default GetForgotPasswordCode