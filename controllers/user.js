import { validationResult } from 'express-validator'
import { userRepository } from '../repositories/index.js'
import { json } from 'express'
import { EventEmitter } from 'node:events'
import Exception from '../exceptions/Exception.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
const myEvent = new EventEmitter()
myEvent.on('event.register.user', (param) => {
  console.log(`they talked about : ${JSON.stringify(param)}`)
})
//---------LOGIN------------
const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() })
  }
  // lấy ra email,pass từ req.body
  const { email, password } = req.body

  //Call repository

  try {
    await userRepository.login({ email, password })
    res.status(HttpStatusCode.OK).json({
      message: 'login user successfully',
      data: 'detail user here'
    })
  } catch (exceptions) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exceptions.toString()
    })
  }
}

//--------------REGister
const register = async (req, res) => {
  const { email, password, name, phoneNumber, address } = req.body
  //Event - Emitter
  myEvent.emit('event.register.user', { email, phoneNumber, address, name })
  try {
    const user = await userRepository.register({
      email,
      password,
      name,
      phoneNumber,
      address
    })
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Register user successfully',
      data: user
    })
  } catch (exceptions) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exceptions.toString()
    })
  }
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
