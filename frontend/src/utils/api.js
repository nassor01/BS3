const API_BASE_URL = 'http://localhost:5000/api';

export const getRooms = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms`);
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        // Map 'availability' to 'isBooked' (frontend expectation)
        return data.map(room => ({
            ...room,
            isBooked: !room.availability
        }));
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return [];
    }
};

export const createBooking = async (bookingData) => {
    try {
        // Enforce specific format for backend
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        if (!response.ok) throw new Error('Failed to create booking');
        return await response.json();
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getBookings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        // Flatten nested objects for frontend
        return data.map(booking => ({
            ...booking,
            userName: booking.User?.fullName || 'Unknown User',
            roomName: booking.Room?.name || 'Unknown Room'
        }));
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
};

export const updateBookingStatus = async (bookingId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update booking status');
        return await response.json();
    } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
    }
};

export const updateRoomStatus = async (roomId, isBooked) => {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/availability`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ availability: !isBooked }),
        });
        if (!response.ok) throw new Error('Failed to update room availability');
        return await response.json();
    } catch (error) {
        console.error('Error updating room availability:', error);
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Signup failed');
        return await response.json();
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) throw new Error('Login failed');
        return await response.json();
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
