import express from 'express'
import usersRouter from './usersRouter.js'
import urlsRouter from './urlsRouter.js'
const  router=express.Router();
router.use(usersRouter)
router.use(urlsRouter)

export default router;