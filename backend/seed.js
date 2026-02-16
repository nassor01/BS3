import sequelize from './config/database.js';
import { Room } from './models/index.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedRooms = [
    { name: 'Main Hall', capacity: 200, description: 'Large event space for conferences and workshops.' },
    { name: 'Incubation Hub', capacity: 30, description: 'Creative space for startups and developers.' },
    { name: 'Recording Studio', capacity: 5, description: 'Professional audio and podcast recording space.' },
    { name: 'Meeting Room A', capacity: 10, description: 'Private space for teamwork and meetings.' },
];

const seed = async () => {
    try {
        console.log('Using environment variables:');
        console.log('DB_HOST:', process.env.DB_HOST);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_NAME:', process.env.DB_NAME);

        // 1. Create database if it doesn't exist
        console.log('Attempting to connect to MySQL...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
        });
        console.log('Connected to MySQL. Creating database if not exists...');
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        await connection.end();
        console.log('Database check/creation complete.');

        // 2. Sync models and seed data
        console.log('Syncing models with Sequelize...');
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true });
        console.log('Models synced.');

        await Room.bulkCreate(seedRooms);
        console.log('Database created and seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
};

seed();
