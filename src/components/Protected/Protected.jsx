import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from 'reactfire';

const Protected = ({ children }) => {
    const { status, data: user } = useUser();
    if(!user){
        return <Navigate to='/' replace />
    }
    return children
}

export default Protected