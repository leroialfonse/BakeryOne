import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getOneProductController, getProductsController, productFilterController, productPhotoController, updateProductController } from '../controllers/productController.js';
// A middleware that mixes express and 'formidable', which is a node module that parses form data, like multipart/form-data uploads. 
import formidable from 'express-formidable'




const router = express.Router();

// product routes 

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
// router.post('/create-category', requireSignIn, isAdmin, categoryController);


// Update a product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)


// get all the products
router.get('/get-product', getProductsController)

// get a single product 
router.get('/get-one-product/:slug', getOneProductController)

// Filter a product
router.post('/product-filter', productFilterController)

// Get product photo
router.get('/product-photo/:pid', productPhotoController)


//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);





export default router;

