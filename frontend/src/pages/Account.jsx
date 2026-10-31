import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Account() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>My Account</h1>

                <p>Welcome to your Paradise Nursery account!</p>

                <div className="account-details">
                    <p>
                        <strong>Name:</strong> {user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {user?.email}
                    </p>
                </div>

                <button
                    type="button"
                    className="auth-button"
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </section>
        </main>
    );
}

export default Account;