import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgGreen.white)

    } catch (error) {
        console.log(`Error found in MongoDB ${error}`.bgRed.white)
    }
};

export default connectDB;