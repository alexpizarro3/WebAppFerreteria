import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({isLog, children}) => {
    return (
        <>
            {
                isLog ? children : <Navigate to='/' />
            }
        </>
    )
}