import mongoose from 'mongoose'
mongoose.set('strictQuery', true)
import { print, consoleStyles } from '../helpers/print.js'
import Exception from '../exceptions/Exception.js'

//--------------------------

//--------------------------

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI)
    print('Connect mongoose successfully', consoleStyles.success)
    return connection
  } catch (error) {
    const { code } = error

    if (error.code == 8000) {
      throw new Exception('Wrong database username and password')
    } else if (code == 'ENOTFOUND') {
      throw new Exception('Wrong server name/connection string')
    }
    throw new Exception('Cannot connect to mongoose')
  }
}
export default connect
