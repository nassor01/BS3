import User from './User.js';
import Room from './Room.js';
import Booking from './Booking.js';

// Define relationships
User.hasMany(Booking);
Booking.belongsTo(User);

Room.hasMany(Booking);
Booking.belongsTo(Room);

export { User, Room, Booking };
