import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/login';
import Register from './views/signup';
import Dashboard from './views/Dashboard';
import AdminLogin from './views/AdminLogin';
import AdminDashboard from './views/AdminDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginWrapper />} />
                <Route path="/signup" element={<RegisterWrapper />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

// Wrapper components to handle the existing prop-based logic if needed, 
// or we can refactor Login/Register to simpler forms. 
// For now, adapting them to work with routes.

const LoginWrapper = () => {
    // In a real app, you'd use a context or global state for user auth
    // For now, we'll just render the Login component. 
    // The existing Login component takes setIsLogin and setUser.
    // We might need to adjust it to redirect upon login.
    const [user, setUser] = useState(null);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Login setIsLogin={() => { }} setUser={setUser} />
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

const RegisterWrapper = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Register setIsLogin={() => { }} />
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default App;
