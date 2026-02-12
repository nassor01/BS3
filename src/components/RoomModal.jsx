import React from 'react';

const RoomModal = ({ isOpen, onClose, room, isAdmin, onStatusChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
                <div className="relative h-64 bg-blue-600">
                    <img
                        src={room?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'}
                        alt={room?.name}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="absolute bottom-6 left-8 text-white">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
                            Room Details
                        </span>
                        <h2 className="text-4xl font-bold">{room?.name}</h2>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {room?.description || 'A premium space designed for innovation and collaboration at Swahilipot Hub. Equipped with modern amenities to support your projects and events.'}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {['Wi-Fi', 'Projector', 'Air Conditioned', 'Whiteboard'].map(amenity => (
                                    <span key={amenity} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Capacity</h3>
                                <p className="text-2xl font-semibold text-blue-600">{room?.capacity || '50'} People</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Current Status</h3>
                                <span className={`px-4 py-2 rounded-full font-bold text-sm ${room?.isBooked
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-green-100 text-green-600'
                                    }`}>
                                    {room?.isBooked ? 'Booked' : 'Available'}
                                </span>
                            </div>

                            {isAdmin && (
                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Admin Controls</h3>
                                    <button
                                        onClick={() => onStatusChange(room?.id, !room?.isBooked)}
                                        className={`w-full py-2 rounded-lg font-bold transition-all ${room?.isBooked
                                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                                : 'bg-red-500 hover:bg-red-600 text-white'
                                            }`}
                                    >
                                        {room?.isBooked ? 'Mark as Available' : 'Mark as Booked'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomModal;
