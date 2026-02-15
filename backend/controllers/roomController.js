import { Room } from '../models/index.js';

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRoomAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;
        const room = await Room.findByPk(id);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        room.availability = availability;
        await room.save();
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
