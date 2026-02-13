import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, isAdmin, onLogout }) => {
    return (
        <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <span className="text-xl font-black text-gray-800 tracking-tight">
                    SWAHILIPOT <span className="text-blue-600 italic">HUB</span>
                </span>
            </div>

            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-gray-800 leading-none">{user.name || (isAdmin ? 'Admin' : 'Member')}</p>
                            <p className="text-xs text-gray-500 mt-1">{user.email || 'account@swahilipot.org'}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                            {(user.name || 'U').charAt(0)}
                        </div>
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                            Login
                        </Link>
                        <Link to="/admin/login" className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                            Admin
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
