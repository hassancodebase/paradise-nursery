
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    registerUser,
    loginUser,
    getCurrentUser,
} from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        () => localStorage.getItem('paradiseToken')
    );
    const [loading, setLoading] = useState(true);

    // Restore the user's session when the app loads
    useEffect(() => {
        let active = true;

        const restoreSession = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await getCurrentUser(token);

                if (active) {
                    setUser(data.user);
                }
            } catch {
                localStorage.removeItem('paradiseToken');

                if (active) {
                    setToken(null);
                    setUser(null);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        restoreSession();

        return () => {
            active = false;
        };
    }, [token]);

    const register = async (userData) => {
        const data = await registerUser(userData);

        localStorage.setItem('paradiseToken', data.token);
        setToken(data.token);
        setUser(data.user);

        return data;
    };

    const login = async (credentials) => {
        const data = await loginUser(credentials);

        localStorage.setItem('paradiseToken', data.token);
        setToken(data.token);
        setUser(data.user);

        return data;
    };

    const logout = () => {
        localStorage.removeItem('paradiseToken');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}
