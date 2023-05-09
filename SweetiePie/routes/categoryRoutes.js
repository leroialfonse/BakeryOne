import express from 'express';
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import { categoryController, updateCategoryController, getCategoryController, oneCategoryController, deleteCategoryController } from '../controllers/categoryController.js';



const router = express.Router();

// routes
// create a category. ensure  user is Admin.
router.post('/create-category', requireSignIn, isAdmin, categoryController);

// update a category, ensure user is Admin
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// Show all Categories
router.get('/get-category', getCategoryController)

// show a single category
router.get('/get-one-category/:slug', oneCategoryController)

// delete a category
// Ensure user is Admin
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;