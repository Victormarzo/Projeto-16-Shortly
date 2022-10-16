import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import {urlValidation,deleteByIdValidation} from '../middlewares/urlsMiddleware.js'
import {postShorten,getUrlById,getUrlByShortUrl,deleteById} from '../controllers/urlsControllers.js'

const router=express.Router();

router.post('/urls/shorten',authUser,urlValidation,postShorten);
router.get('/urls/:id',getUrlById);
router.get('/urls/open/:shortUrl',getUrlByShortUrl);
router.delete('/urls/:id',authUser,deleteByIdValidation,deleteById)
export default router;