import { Booking, Room, User } from '../models/index.js';
import { sendBookingNotification, sendStatusUpdateNotification } from '../utils/mailer.js';

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

        console.log(`🔄 Updating status for booking ID: ${id} to ${status}`);

        const booking = await Booking.findByPk(id, {
            include: [User, Room]
        });

        if (!booking) {
            console.error(`❌ Booking with ID ${id} not found`);
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();
        console.log(`✅ Database updated for booking ID: ${id}`);

        // Send status update notification
        const associatedUser = booking.User || booking.user;
        const associatedRoom = booking.Room || booking.room;

        if (associatedUser && associatedUser.email) {
            console.log(`📨 Attempting to send status email to: ${associatedUser.email}`);
            await sendStatusUpdateNotification(associatedUser.email, {
                roomName: associatedRoom ? associatedRoom.name : 'Your Room',
                date: booking.date,
                time: booking.time,
                status: status
            });
        } else {
            console.warn(`⚠️ No user email found for booking ID: ${id}. User associated: ${associatedUser ? 'Yes' : 'No'}`);
        }

        res.json(booking);
    } catch (error) {
        console.error('❌ Status update notification error:', error);
        res.status(500).json({ message: error.message });
    }
};
