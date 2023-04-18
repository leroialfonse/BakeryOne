import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController } from '../controllers/productController.js';
// A middleware that mixes express and 'formidable', which is a node module that parses form data, like multipart/form-data uploads. 
import formidable from 'express-formidable'




const router = express.Router();

// product routes 

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)







export default router;

