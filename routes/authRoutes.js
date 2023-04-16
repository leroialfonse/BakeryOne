import express from 'express';
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';



//router object..
const router = express.Router();


//routing
//Register || POST method
router.post('/register', registerController);

//Login || POST method
router.post('/login', loginController);

// Forgot a password POST method.
router.post('/forgot-password', forgotPasswordController)



// Testing routes
router.get('/test', requireSignIn, isAdmin, testController);

// User protected route 
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// Admin protected route 
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;
