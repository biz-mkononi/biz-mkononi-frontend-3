import React, { useState } from 'react'
import { TextField } from "@mui/material"
import { verifyPhone } from "../../Data/Auth/Data"
import { useNavigate } from "react-router-dom"
import "./Login.css"


const VerifyPhone = () => {
    const navigate = useNavigate()

    const initialState = { code: "", password: "", phone: "", password2: "" }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const phoneVerification = () => {
        verifyPhone(formData)
        navigate(0)
    }
    return (
        <React.Fragment>
            <>
                <h3 className="mt-2 mb-5 text-center " style={{ fontWeight: "bold" }}>Verify Phone</h3>
                <div className="mb-2 field">
                    <TextField id="standard-basic" name="phone" label="phone" required onChange={handleChange} variant="standard" className="textfield mb-3" />
                </div>
                <div className="mb-2 field">
                    <TextField id="standard-basic" label="Code" name="code" onChange={handleChange} variant="standard" className="textfield mb-3" required />
                </div>
                <div className="mt-3 text-center sign-button">
                    <button className="btn btn-primary btn-md" onClick={phoneVerification}>Verify Phone</button>
                </div>


            </>
        </React.Fragment>
    )
}

export default VerifyPhone