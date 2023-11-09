import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Compiler from "../Compiler/Compiler";


function MainPage() {

    

    return (
        <div>
            <Routes>
                <Route path="/" element={<Compiler />}></Route>
                <Route path="*" element={<Navigate to={"/"} replace />}></Route>
            </Routes>
        </div>
    )

}

export default MainPage;