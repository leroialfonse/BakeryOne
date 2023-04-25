import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getOneProductController, getProductsController, productCountController, productFilterController, productListContoller, productPhotoController, updateProductController } from '../controllers/productController.js';
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

// Filter products by price and or category
router.post('/product-filter', productFilterController)

// Get product photo
router.get('/product-photo/:pid', productPhotoController)


// Count the products to display on the page.
router.get('/product-count', productCountController)


// Products per page.
router.get('/product-list/:page', productListContoller)


//delete product
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);





export default router;

