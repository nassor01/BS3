import React from 'react';
import Navbar from './Navbar';


const Layout = ({ children, user, isAdmin, onLogout }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar user={user} isAdmin={isAdmin} onLogout={onLogout} />
            <main className="flex-1 p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
