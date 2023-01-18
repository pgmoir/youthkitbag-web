import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default ProtectedRoute;
