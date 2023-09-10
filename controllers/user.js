import { validationResult } from 'express-validator'
import { userRepository } from '../repositories/index.js'
import { json } from 'express'
import { EventEmitter } from 'node:events'
const myEvent = new EventEmitter()
myEvent.on('event.register.user', (param) => {
  console.log(`they talked about : ${JSON.stringify(param)}`)
})
const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body

  //Call repository
  await userRepository.login({ email, password })
  res.status(200),
    json({
      message: 'login user successfully'
      // data: "detail user here",
    })
}

const register = async (req, res) => {
  const { email, password, name, phoneNumber, address } = req.body
  await userRepository.register({ email, password, name, phoneNumber, address })
  //Event - Emitter
  res.status(201).json({
    message: 'Register user successfully'
  })
}

const getDetailUser = async (req, res) => {
  res.send('POST getDetailUser ')
}
//many other function
export default {
  login,
  register,
  getDetailUser
}
