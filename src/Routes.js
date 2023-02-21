import React from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './core/Home';
import Signin from './user/Signin';
import ProtectedRoute from "./auth/PrivateRoute"
import Signup from './user/Signup';
import UserDashboard from './user/UserDashboard';
import Cart from './core/Cart';


function AppRoutes(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" exact element={<Signin />} />
                <Route path="/signup" exact element={<Signup />} />
                <Route path='/user/dashboard' exact element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}/>
                <Route path='/cart' exact element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;