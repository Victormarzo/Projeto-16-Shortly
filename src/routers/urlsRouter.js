import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import {urlValidation} from '../middlewares/urlsMiddleware.js'
import {postShorten} from '../controllers/urlsControllers.js'

const router=express.Router();

router.post('/urls/shorten',authUser,urlValidation,postShorten)

export default router;