import { Navigate } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext';
import { helpPermsion } from '@/helpers/helpPermsion';


const GuestRoute = ({ children }) => {
  const { isLoggedIn, user } = useLoginContext();

  if (isLoggedIn) {
    const { filterRouter } = helpPermsion();
    const { routes } = filterRouter(user?.rol);
    return <Navigate to={routes[0] ?? '/admin/requests'} replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
