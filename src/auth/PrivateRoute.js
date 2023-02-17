import React from 'react';
import {Route,Navigate} from 'react-router-dom'
import {isAuthenticated} from './helper'
import Signin from '../user/Signin';

function PrivateRoute({children}){
    const auth = isAuthenticated()

    if(auth)
return (
    <>
        {children}
    </>
)
else return <Navigate to='/signin'/>
}
export default PrivateRoute;