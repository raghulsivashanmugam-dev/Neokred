import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Login/login";
import SignUp from "../Login/signup";

function LoginPage(){

    return(
        <div>
            <Routes>
                <Route exact path="/" element={<Login />}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
                <Route path="*" element={<Navigate to={"/"} replace />}></Route>
            </Routes>
        </div>
    )

}

export default LoginPage;