import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8 text-blue-400">Swahilipot Admin</h2>
                <nav className="space-y-4">
                    <a href="#" className="block px-4 py-2 bg-gray-800 rounded text-white">Dashboard</a>
                    <a href="#" className="block px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded transition-colors">Users</a>
                    <a href="#" className="block px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded transition-colors">Bookings</a>
                    <a href="#" className="block px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded transition-colors">Settings</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition-colors"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-800">1,234</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Active Bookings</h3>
                        <p className="text-3xl font-bold text-gray-800">56</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Pending Approvals</h3>
                        <p className="text-3xl font-bold text-yellow-600">12</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-gray-800">New user registration</p>
                                <p className="text-sm text-gray-500">John Doe joined 2 hours ago</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-gray-800">Booking request #452</p>
                                <p className="text-sm text-gray-500">Jane Smith requested Main Hall</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>
                        </div>
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium text-gray-800">System Update</p>
                                <p className="text-sm text-gray-500">Server maintenance completed</p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">System</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
