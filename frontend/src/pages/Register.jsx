
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Leaf, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
    const { register, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (loading) {
        return <div className="auth-loading">Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/plants" replace />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must contain at least 8 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Your passwords do not match.');
            return;
        }

        setSubmitting(true);

        try {
            await register({ name, email, password });
            navigate('/plants', { replace: true });
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

                <p className="eyebrow">JOIN OUR COMMUNITY</p>
                <h1>Let's grow together.</h1>
                <p className="auth-description">
                    Create an account and bring a little more nature into your life.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label htmlFor="register-name">Full name</label>
                    <input
                        id="register-name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        maxLength={60}
                        required
                    />

                    <label htmlFor="register-email">Email address</label>
                    <input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Enter your password again"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        autoComplete="new-password"
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
                        {submitting ? 'Creating account...' : 'Create Account'}
                        <UserPlus size={18} />
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link to="/login">Sign in</Link>
                </p>
            </section>
        </main>
    );
}
