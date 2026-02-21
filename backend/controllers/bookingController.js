import { Booking, Room, User } from '../models/index.js';
import { sendBookingNotification } from '../utils/mailer.js';

export const createBooking = async (req, res) => {
    try {
        const { roomId, userId, date, startTime, endTime } = req.body;
        // Accept either camelCase or capitalized keys from the client
        const userIdVal = userId || req.body.UserId;
        const roomIdVal = roomId || req.body.RoomId;

        // 1. Create the booking
        const booking = await Booking.create({
            UserId: userIdVal,
            RoomId: roomIdVal,
            date,
            time: `${startTime} - ${endTime}` // Combining for the existing 'time' field
        });

        // 2. Mark the room as unavailable (booked)
        const room = await Room.findByPk(roomIdVal);
        if (room) {
            room.availability = false;
            await room.save();
        }

        // 3. Send email notification
        const user = await User.findByPk(userIdVal);
        if (user && user.email) {
            await sendBookingNotification(user.email, {
                roomName: room ? room.name : 'Selected Room',
                date: date,
                startTime: startTime,
                endTime: endTime
            });
        }

        res.status(201).json(booking);
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [Room, User]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await Booking.findByPk(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
