import express from 'express';
import {postSignUp,postSignIn,getMe} from '../controllers/usersControllers.js'
import authUser from '../middlewares/authMiddleware.js';
import {postSignUpValidation,postSignInValidation,meValidation} from '../middlewares/usersMiddleware.js'

const router=express.Router();

router.post('/signup',postSignUpValidation,postSignUp);
router.post('/signin',postSignInValidation,postSignIn)
router.get('/users/me',authUser,meValidation,getMe)
export default router;