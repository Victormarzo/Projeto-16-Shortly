import express from 'express'
import usersRouter from './usersRouter.js'
import urlsRouter from './urlsRouter.js'
import rankRouter from './rankRouter.js'

const  router=express.Router();
router.use(usersRouter)
router.use(urlsRouter)
router.use(rankRouter)

export default router;