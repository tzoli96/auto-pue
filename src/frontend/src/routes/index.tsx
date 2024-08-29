import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Filltered from '../pages/Filltered.tsx';
import SingleEdit from '../pages/SingleEdit.tsx';
import Login from '../pages/Login';
import Logout from '../pages/Logout.tsx';
import ProtectedRoute from './protectedRoutes';

const router = createBrowserRouter([
  {
    path: "/edit/:id",
    element: <ProtectedRoute element={<SingleEdit />} />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: "/filltered",
    element: <ProtectedRoute element={<Filltered />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
