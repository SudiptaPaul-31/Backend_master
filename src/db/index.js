import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        // No need to append DB_NAME to the MONGODB_URI in the .env file
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI + DB_NAME, {
    
        });
        console.log(`\nMongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGODB connection error: ', error);
        process.exit(1);
    }
};

export default connectDB;
