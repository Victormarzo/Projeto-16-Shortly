import express from 'express';
import {postSignUp,postSignIn} from '../controllers/usersControllers.js'
import {postSignUpValidation,postSignInValidation} from '../middlewares/usersMiddleware.js'

const router=express.Router();

router.post('/signup',postSignUpValidation,postSignUp);
router.post('/signin',postSignInValidation,postSignIn)

export default router;