import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import {urlValidation} from '../middlewares/urlsMiddleware.js'
import {postShorten,getUrlById} from '../controllers/urlsControllers.js'

const router=express.Router();

router.post('/urls/shorten',authUser,urlValidation,postShorten)
router.get('/urls/:id',getUrlById)
export default router;