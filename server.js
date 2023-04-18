import express from 'express';
const PORT = process.env.PORT || 8500;
// Colors error and response messages in my terminal! unneccessary, but cool.
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'


// ENV config
dotenv.config();

// DBconfig
connectDB();

// REST Obj 
const app = express();

// middlewares 
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);


// Getting into the API at the main route.
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Light and Shadow! (Ecomm 2023)</h1>")
})


app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white);
})
