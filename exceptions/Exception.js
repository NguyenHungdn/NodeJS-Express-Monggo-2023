import { print, consoleStyles } from '../helpers/print.js'
export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = 'wrong database username and password'
  static WRONG_CONNECTION_STRING = 'Wrong server name/connection string'
  static CANNOT_CONNECT_MONGODB = 'Cannot connect to Mongoose'
  static USER_EXIST = 'User Already exits'
  static CANNOT_REGISTER_USER = 'Can not register user'
  static WRONG_EMAIL_AND_PASSWORD = 'Wrong email and password'
  constructor(message) {
    super(message)
    print(message, consoleStyles.error)
  }
}
