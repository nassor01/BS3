import React, { useState } from 'react';
import { login } from '../utils/api';

export default function Login({ setIsLogin, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await login({ email, password });
            localStorage.setItem('userSession', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold">Login</h2>
            <input
                className="border p-2 rounded w-64"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                className="border p-2 rounded w-64"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-64"
                onClick={handleLogin}
            >
                Login
            </button>

        </div>
    );
}
