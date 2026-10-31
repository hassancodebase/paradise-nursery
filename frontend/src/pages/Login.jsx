
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const { login, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const destination = location.state?.from || '/plants';

    if (loading) {
        return <div className="auth-loading">Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/plants" replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await login({ email, password });
            navigate(destination, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <Link to="/" className="auth-brand">
                    <Leaf size={25} />
                    Paradise Nursery
                </Link>

                <p className="eyebrow">WELCOME BACK</p>
                <h1>Good to see you.</h1>
                <p className="auth-description">
                    Sign in to continue your greener living journey.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label htmlFor="login-email">Email address</label>
                    <input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <p className="auth-error" role="alert">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={submitting}
                    >
                        {submitting ? 'Signing in...' : 'Sign In'}
                        <LogIn size={18} />
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/register">Create one</Link>
                </p>
            </section>
        </main>
    );
}
