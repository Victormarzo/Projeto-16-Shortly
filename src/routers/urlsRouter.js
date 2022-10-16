import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
const router=express.Router();

router.post('/urls/shorten',authUser)

export default router;