import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Wait until the saved login session has been checked.
    if (loading) {
        return (
            <div className="auth-loading">
                Checking your login session...
            </div>
        );
    }

    // Redirect logged-out users to Login.
    // Remember the page they originally wanted to visit.
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Allow authenticated users to access the page.
    return children;
}

export default ProtectedRoute;