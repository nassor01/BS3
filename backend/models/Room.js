import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primary_key: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

export default Room;
