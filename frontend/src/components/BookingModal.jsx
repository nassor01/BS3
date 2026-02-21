import React, { useState } from 'react';

const BookingModal = ({ isOpen, onClose, room, onBook }) => {
    const [bookingDate, setBookingDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 7; hour <= 21; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const time = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${ampm}`;
                options.push(time);
                if (hour === 21 && min === 0) break;
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mocking API call
        setTimeout(() => {
            onBook({
                roomId: room.id,
                roomName: room.name,
                date: bookingDate,
                startTime: startTime,
                endTime: endTime,
                status: 'Pending'
            });
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Book {room?.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                            <select
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            >
                                <option value="" disabled>Start</option>
                                {timeOptions.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                            <select
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            >
                                <option value="" disabled>End</option>
                                {timeOptions.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Your booking will be sent to the admin for approval.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
