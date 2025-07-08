// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('access_token'); // or use your auth logic

  return !isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
