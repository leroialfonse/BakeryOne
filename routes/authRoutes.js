import express from 'express';
import {
    registerController,
    loginController,
    testController
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';



//router object..
const router = express.Router();


//routing
//Register || POST method
router.post('/register', registerController);

//Login || POST method
router.post('/login', loginController);

// Testing routes
router.get('/test', requireSignIn, isAdmin, testController);



export default router;
