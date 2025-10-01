import { useAuth } from '../context/AuthContext';

export function withAuth(Component) {
  return function Protected(props) {
    const { isAuthenticated } = useAuth();
    // ...redirect if not authenticated...
    return isAuthenticated ? <Component {...props} /> : null;
  };
}
