import express from 'express';
import { getAllRooms, getRoomById, updateRoomAvailability } from '../controllers/roomController.js';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.patch('/:id/availability', updateRoomAvailability);

export default router;
