import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRooms, createBooking } from '../utils/api';
import BookingModal from '../components/BookingModal';
import RoomModal from '../components/RoomModal';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await getRooms();
            setRooms(data);
            setLoading(false);
        };
        fetchRooms();
    }, []);

    const handleOpenBooking = (room) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
    };

    const handleOpenRoomDetails = (room) => {
        setSelectedRoom(room);
        setIsRoomModalOpen(true);
    };

    const handleBooking = async (bookingData) => {
        await createBooking(bookingData);
        alert('Booking submitted successfully! Waiting for admin approval.');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                </div>

                <div className="max-w-6xl mx-auto z-10 relative flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
                            SWAHILIPOT HUB
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-blue-100 max-w-xl">
                            Empowering the Community through Innovation and Art.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 flex gap-4">
                        <Link to="/login" className="px-6 py-2 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all">
                            Login
                        </Link>
                        <Link to="/admin/login" className="px-6 py-2 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-800 transition-all">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>

            {/* Rooms Section */}
            <main className="max-w-6xl mx-auto px-4 py-16 w-full">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Available Rooms</h2>
                        <p className="text-gray-500 mt-2">Find and book the perfect space for your next project.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map(room => (
                            <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-200 relative">
                                    <img
                                        src={`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400`}
                                        alt={room.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${room.isBooked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {room.isBooked ? 'Booked' : 'Available'}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.description}</p>
                                    <div className="flex items-center text-sm text-gray-400 mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Capacity: {room.capacity}
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleOpenRoomDetails(room)}
                                            className="flex-1 py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleOpenBooking(room)}
                                            disabled={room.isBooked}
                                            className={`flex-[2] py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ${room.isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {room.isBooked ? 'Reserved' : 'Book Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modals */}
            <RoomModal
                isOpen={isRoomModalOpen}
                onClose={() => setIsRoomModalOpen(false)}
                room={selectedRoom}
            />
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                room={selectedRoom}
                onBook={handleBooking}
            />
        </div>
    );
};

export default Dashboard;

