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

// import bodyParser from 'body-parser'
// var express = require("express");
// const bodyParser = require("body-parser");
// var app = express();


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

// fixing "413 Request Entity Too Large" errors

// Express 4.0
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Express 3.0
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 }))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category/', categoryRoutes);
app.use('/api/v1/product', productRoutes)

// Getting into the API at the main route.
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Sweetie Pie! (Ecomm 2023)</h1>")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgBlue.white);
})
