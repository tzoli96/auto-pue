import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAuthenticated }) {
    console.log(isAuthenticated)
    return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
