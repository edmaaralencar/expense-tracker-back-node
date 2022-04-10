import { Router } from 'express'

import { register, login, updateUser } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authMiddleware, updateUser)

export default router
