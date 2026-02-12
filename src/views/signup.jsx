import React, { useState } from "react";

export default function Register({ setIsLogin }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        const user = { fullName, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Registration successful!");
        setIsLogin(true);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <input
                className="border p-2 rounded w-64"
                placeholder="Full Name"
                onChange={e => setFullName(e.target.value)}
            />
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
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-64"
                onClick={handleRegister}
            >
                Register
            </button>
            <p
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
            >
                Already have an account? Login
            </p>
        </div>
    );
}
