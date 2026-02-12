import React, { useState } from 'react';
import Login from './views/login';
import Register from './views/signup';

function App() {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

    if (user) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">
                        Welcome, {user.fullName}!
                    </h1>
                    <p className="text-gray-700 mb-6">
                        You are successfully logged in.
                    </p>
                    <button
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                        onClick={() => setUser(null)}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {isLogin ? (
                    <Login setIsLogin={setIsLogin} setUser={setUser} />
                ) : (
                    <Register setIsLogin={setIsLogin} />
                )}
            </div>
        </div>
    );
}

export default App;
