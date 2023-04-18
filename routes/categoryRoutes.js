import express from 'express';
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import { categoryController } from '../controllers/categoryController.js';


const router = express.Router();

// routes

router.post('/create-category', requireSignIn, isAdmin, categoryController);


export default router;