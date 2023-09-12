import express from 'express'
import { userController } from '../controllers/index.js'

import { body } from 'express-validator'
const router = express.Router()
router.get('/', (req, res) => {
  res.send('GET USER')
})
router.get('/:id', userController.getDetailUser)
//**********Login********** */
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  userController.login
)
router.post('/register', userController.register)
export default router
