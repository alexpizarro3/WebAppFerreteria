import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const isLog = false;

const PrivateRoute = ({ component: Component}) => {
    return isLog ? <Component /> : <Navigate to = '/' /> 
}

export default PrivateRoute
