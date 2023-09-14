import { print, consoleStyles } from '../helpers/print.js'
import { User } from '../models/index.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec()
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password)
    if (!!isMatch) {
      //create Json web toker
      let token = Jwt.sign(
        {
          data: existingUser
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30 days'
        }
      )
      //clone ad add more properties
      return {
        ...existingUser.toObject(),
        password: 'not show',
        token: token
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
  }
  print('login user in repository', consoleStyles.information)
}
const register = async ({ email, password, name, phoneNumber, address }) => {
  let existingUser = await User.findOne({ email }).exec()
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST)
  }
  //encrypt password ,use bcrypt
  //used for login purpose
  // const isMatched = await bcrypt.compare(password, existingUser.password)
  // if (isMatched) {
  // }
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  )
  //insert to db

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address
  })
  return {
    ...newUser._doc,
    password: 'Not Show'
  }
  // print(    `register with ${email} ++ ${name}++${phoneNumber} ++${address}`,
  //   consoleStyles.success
  // )
  //validation already done
}
export default {
  login,
  register
}
