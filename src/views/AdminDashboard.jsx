import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, getRooms, updateBookingStatus, updateRoomStatus } from '../utils/api';
import RoomModal from '../components/RoomModal';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
        }

        const fetchData = async () => {
            const [bookingsData, roomsData] = await Promise.all([
                getBookings(),
                getRooms()
            ]);
            setBookings(bookingsData);
            setRooms(roomsData);
            setLoading(false);
        };
        fetchData();
    }, [navigate]);

    const handleUpdateBookingStatus = async (bookingId, status) => {
        await updateBookingStatus(bookingId, status);
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    };

    const handleToggleRoomStatus = async (roomId, isBooked) => {
        await updateRoomStatus(roomId, isBooked);
        setRooms(rooms.map(r => r.id === roomId ? { ...r, isBooked } : r));
        if (selectedRoom?.id === roomId) {
            setSelectedRoom({ ...selectedRoom, isBooked });
        }
    };

    const handleOpenRoomDetails = (room) => {
        setSelectedRoom(room);
        setIsRoomModalOpen(true);
    };

    return (
        <div className="w-full">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">Admin Dashboard</h1>
                <p className="text-gray-500 text-lg font-medium">Manage your rooms and bookings with precision.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Rooms</h3>
                    <p className="text-4xl font-extrabold text-gray-800">{rooms.length}</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Pending Bookings</h3>
                    <p className="text-4xl font-extrabold text-yellow-500">
                        {bookings.filter(b => b.status === 'Pending').length}
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Active Spaces</h3>
                    <p className="text-4xl font-extrabold text-green-500">
                        {rooms.filter(r => r.isBooked).length}
                    </p>
                </div>
            </div>

            {/* Bookings Table */}
            <div id="bookings" className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-12 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Latest Bookings</h3>
                    <span className="text-sm text-blue-600 font-semibold">View all</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Room</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{booking.userName}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.roomName}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {booking.date} at {booking.time}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-semibold">
                                        {booking.duration || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                            booking.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                                'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        {booking.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateBookingStatus(booking.id, 'Approved')}
                                                    className="text-green-600 hover:text-green-700 font-bold text-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateBookingStatus(booking.id, 'Rejected')}
                                                    className="text-red-600 hover:text-red-700 font-bold text-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Rooms Management */}
            <div id="rooms" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                    <div key={room.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-gray-800">{room.name}</h4>
                            <p className="text-sm text-gray-500">Capacity: {room.capacity}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleOpenRoomDetails(room)}
                                className="text-blue-600 hover:underline text-sm font-semibold"
                            >
                                View
                            </button>
                            <button
                                onClick={() => handleToggleRoomStatus(room.id, !room.isBooked)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${room.isBooked ? 'bg-red-500' : 'bg-green-500'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${room.isBooked ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <RoomModal
                isOpen={isRoomModalOpen}
                onClose={() => setIsRoomModalOpen(false)}
                room={selectedRoom}
                isAdmin={true}
                onStatusChange={handleToggleRoomStatus}
            />
        </div>
    );
};

export default AdminDashboard;

