import React, { useState } from "react"
import "./Login.css"
import image1 from "../../Assets/Group 2.svg"
import image2 from "../../Assets/logo.png"
import image3 from "../../Assets/ai-1.svg"
import image4 from "../../Assets/customer 1.svg"
import image5 from "../../Assets/insight 1.svg"
import image6 from "../../Assets/business-and-finance 1.svg"
import { TextField, FormControlLabel, Checkbox } from "@mui/material"


const Login = () => {
    const [isSignup, setIsSignup] = useState(false)

    const switchMode = () => {
        setIsSignup((prev) => !prev)
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
                        <div style={{ display: "flex" }}>
                            <img src={image3} className="img-fluid" alt="..." />
                            <p>AI Powered Business Intelligence</p>
                        </div>

                        <div style={{ display: "flex" }}>
                            <img src={image4} className="img-fluid" alt="..." />
                            <p>360° Customer view</p>
                        </div>

                        <div style={{ display: "flex" }}>
                            <img src={image5} className="img-fluid" alt="..." />
                            <p>100% Business Insights</p>
                        </div>

                        <div style={{ display: "flex" }}>
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
                                    <h5 className="mt-3 mb-3">Create an Account</h5>
                                    <TextField id="standard-basic" label="Name" variant="standard" className="textfield mb-3" />
                                    <TextField id="standard-basic" label="Phone" variant="standard" className="textfield mb-3" />
                                    <TextField id="standard-basic" label="email" variant="standard" className="textfield mb-3" />
                                    <TextField id="standard-basic" label="Password" variant="standard" className="textfield mb-3" />
                                    <TextField id="standard-basic" label="Confirm Password" variant="standard" className="textfield mb-3" />

                                    <div style={{ display: "flex" }}>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                    </div>
                                    <div className="mt-3 sign-button">
                                        <button className="btn btn-primary btn-md">Register</button>
                                    </div>
                                    <div className="mt-3">
                                        <p>Already have an account yet? <a href="#" onClick={switchMode} >Sign In</a></p>
                                    </div>
                                    <div className="mt-0">
                                        <p>Resend Verification SMS? <a href="#" >Resend</a></p>
                                    </div>
                                    <div className="mt-0">
                                        <p>Verify Phone? <a href="#" >Verify Phone</a></p>
                                    </div>
                                </div>
                            </div> :
                            <div className="container">
                                {/* <img src={image1} className="img-fluid login-img" alt="..." /> */}
                                <div className="card login-card mt-5">
                                    <h5 className="mt-3 mb-3">Sign In</h5>
                                    <TextField id="standard-basic" label="Phone" variant="standard" className="textfield mb-3" />
                                    <TextField id="standard-basic" label="Password" variant="standard" className="textfield mb-3" />
                                    <div style={{ display: "flex" }}>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                                        <p>Forgot password?</p>
                                    </div>
                                    <div className="mt-3 sign-button">
                                        <button className="btn btn-primary btn-md">Sign In</button>
                                    </div>
                                    <div className="mt-3">
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