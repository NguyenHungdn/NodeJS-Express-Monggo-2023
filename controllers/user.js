import { validationResult } from 'express-validator'
import { userRepository } from '../repositories/index.js'
// import { json } from 'express'
import { EventEmitter } from 'node:events'
import Exception from '../exceptions/Exception.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

//---------LOGIN------------
const login = async (req, res) => {
  // bắt lỗi từ validation
  const errors = validationResult(req)
  //nếu  có lỗi
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
    // nhậN User tồn tại từ repository.login
    let existingUser = await userRepository.login({ email, password })
    console.log(existingUser)
    // bắn stt thành công
    res.status(HttpStatusCode.OK).json({
      message: 'login user successfully control',
      data: existingUser
    })
  } catch (exceptions) {
    //nếu lỗi bắn status error
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exceptions.toString()
    })
  }
}
//--------------REGister

const myEvent = new EventEmitter()
myEvent.on('event.register.user', (param) => {
  console.log(`they talked about : ${JSON.stringify(param)}`)
})
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
