import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/authService';

interface ProtectedRouteProps {
    element: JSX.Element;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(AuthService.isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return isAuthenticated ? element : <Navigate to="/login" />;
}
