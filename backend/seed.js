import sequelize from './config/database.js';
import { Room } from './models/index.js';

const seedRooms = [
    { name: 'Main Hall', capacity: 200, description: 'Large event space for conferences and workshops.' },
    { name: 'Incubation Hub', capacity: 30, description: 'Creative space for startups and developers.' },
    { name: 'Recording Studio', capacity: 5, description: 'Professional audio and podcast recording space.' },
    { name: 'Meeting Room A', capacity: 10, description: 'Private space for teamwork and meetings.' },
];

const seed = async () => {
    try {
        await sequelize.sync({ force: true });
        await Room.bulkCreate(seedRooms);
        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
