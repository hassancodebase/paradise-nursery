
const API_URL = 'http://localhost:5000/api/auth';

async function authRequest(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        const validationMessage = data.errors
            ?.map((error) => error.msg)
            .join(', ');

        throw new Error(
            validationMessage || data.message || 'Authentication failed'
        );
    }

    return data;
}

export async function registerUser(userData) {
    return authRequest('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

export async function loginUser(credentials) {
    return authRequest('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export async function getCurrentUser(token) {
    return authRequest('/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
