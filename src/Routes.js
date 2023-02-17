import React from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './core/Home';
import Signin from './user/Signin';
import ProtectedRoute from "./auth/PrivateRoute"


function AppRoutes(props) {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" exact element={<Home />} /> */}
                <Route path="/signin" exact element={<Signin />} />
                <Route path='/user/dashboard' exact element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;