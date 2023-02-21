import React from 'react';
import {Navigate} from 'react-router-dom'
import {isAuthenticated} from './helper'

function PrivateRoute({children}){
    const auth = isAuthenticated()

    if(auth)
return (
    <>
        {children}
    </>
)
else return <Navigate to='/login'/>
}
export default PrivateRoute;