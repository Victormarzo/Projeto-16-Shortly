import express from 'express';
import {postSignUp} from '../controllers/usersControllers.js'
import {postSignUpValidation} from '../middlewares/usersMiddleware.js'

const router=express.Router();

router.post('/signup',postSignUpValidation,postSignUp);

export default router;