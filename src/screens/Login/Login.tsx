import React, { useState } from "react"
import "./Login.css"
import LoginBanner from "./LoginBanner"
import SignUpPage from "./SignUpPage"
import LoginPage from "./LoginPage"

interface props {
    setIsAuth: any
}


const Login = () => {

    const [isSignup, setIsSignup] = useState(false)

    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    return (
        <div className="container-fluid login">
            <img src="" alt="" />
            <div className="row padding">
                <div className="col-lg-6 col-sm-12">
                    <LoginBanner />
                </div>
                <div className="col-lg-6 ">
                    <div className="sign-container">

                        {
                            isSignup ?
                                <div className="container">
                                    <div className="card login-card ">
                                        <SignUpPage switchmode={switchMode} />

                                    </div>
                                </div> :
                                <div className="container">
                                    <div className="card login-card mt-5">

                                        <LoginPage switchmode={switchMode} />

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