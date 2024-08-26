import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ProtectedRoute from './protectedRoutes';
import AuthService from '../services/authService';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} isAuthenticated={AuthService.isAuthenticated()} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
