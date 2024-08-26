import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const { authState } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                authState.token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
