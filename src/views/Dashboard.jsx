import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="z-10 text-center px-4">
                <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                    SWAHILIPOT HUB
                </h1>
                <p className="text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto text-blue-100">
                    Empowering the Community through Innovation and Art.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Member Login
                    </Link>
                    <Link
                        to="/signup"
                        className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105"
                    >
                        Join Us
                    </Link>
                </div>

                <div className="mt-12">
                    <Link to="/admin/login" className="text-blue-200 hover:text-white underline text-sm">
                        Admin Access
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
