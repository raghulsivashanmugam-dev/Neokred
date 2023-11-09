import React, { useEffect, useState } from "react";
import "./login.css"
import "../Helpher/helpher.css";
import "../Helpher/common.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { baseUrl } from "../../common";

function SignUp() {



    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [organizationId, setOrganizationId] = useState();
    const [organList, setOrganList] = useState([])





    function submitAuth(event) {
        event.preventDefault()

        var data = {
            "email": email,
            "password": password,
        }

        axios.post(`${baseUrl}user/signup`, data, {
            headers: {
                "Content-Type": " application/json",
                "X-Requested-With": "XMLHttpRequest",
            }

        }).then((data) => {
            sessionStorage.setItem("tokens", data.data.accessToken)
            sessionStorage.setItem("token", "yes")
            window.location.pathname = "/"
        }).catch((error) => {

        })

    }

    return (
        <div className="d-flex justify-content-center align-items-center page-height">
            <div className="auth-container">
                <h3 className="text-align-center">SIGNUP</h3>
                <form onSubmit={(event) => submitAuth(event)}>
                    <div className="mt-20">
                        <label className="fs-14 fw-500">Email Id</label>
                        <div>
                            <input type="text" onChange={(event) => setEmail(event.target.value)} value={email} className="input-box"></input>
                        </div>
                    </div>
                    <div className="mt-20">
                        <label className="fs-14 fw-500">Password</label>
                        <div>
                            <input type="password" onChange={(event) => setPassword(event.target.value)} value={password} className="input-box"></input>
                        </div>
                    </div>
                    <p className="text-align-center fs-12">Already register? <Link to="/">Login</Link></p>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="auth-button">Signup</button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default SignUp;