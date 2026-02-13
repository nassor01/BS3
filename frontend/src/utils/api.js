// Mock data for rooms
const MOCK_ROOMS = [
    { id: 1, name: 'Main Hall', capacity: 200, isBooked: false, description: 'Large event space for conferences and workshops.' },
    { id: 2, name: 'Incubation Hub', capacity: 30, isBooked: false, description: 'Creative space for startups and developers.' },
    { id: 3, name: 'Recording Studio', capacity: 5, isBooked: false, description: 'Professional audio and podcast recording space.' },
    { id: 4, name: 'Meeting Room A', capacity: 10, isBooked: false, description: 'Private space for teamwork and meetings.' },
];

// Mock data for bookings
const initialBookings = [];

let MOCK_BOOKINGS = JSON.parse(localStorage.getItem('swahilipot_bookings')) || initialBookings;

const saveBookings = (bookings) => {
    localStorage.setItem('swahilipot_bookings', JSON.stringify(bookings));
};

export const getRooms = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROOMS;
};

export const getBookings = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_BOOKINGS;
};

export const createBooking = async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newBooking = {
        id: Math.floor(Math.random() * 1000),
        ...bookingData,
        userName: bookingData.userName || 'Unknown User',
        status: 'Pending'
    };
    MOCK_BOOKINGS = [newBooking, ...MOCK_BOOKINGS];
    saveBookings(MOCK_BOOKINGS);
    return newBooking;
};

export const updateBookingStatus = async (bookingId, status) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    MOCK_BOOKINGS = MOCK_BOOKINGS.map(b => b.id === bookingId ? { ...b, status } : b);
    saveBookings(MOCK_BOOKINGS);
    return true;
};

export const updateRoomStatus = async (roomId, isBooked) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would update the DB
    return true;
};
