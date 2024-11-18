import express from 'express';
const PORT = 4000;
// Colors error and response messages in my terminal! unneccessary, but cool.
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
// const path = require('path');

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
// app.use(express.static(path.join(__dirname, 'build')))

app.use(express.static(path.join(__dirname, './client/build')))



//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)


app.use('/*', function (req, res) {

    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// app.get('/', function (req, res) {

//     res.sendFile(path.join(__dirname, '*')),
//         function (err) {
//             console.log(err)
//             res.status(500).send(err)
//         }
// })


app.use('/*', function (req, res) {

    res.sendFile(path.join(__dirname, '/client/build/index.html')),
        function (err) {
            console.log(err)
            res.status(500).send(err)
        }
})

// rest api
app.get("/", (req, res) => {
    res.send("<h1>It's Sweetie Pie!</h1>");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgBlue.white);
})