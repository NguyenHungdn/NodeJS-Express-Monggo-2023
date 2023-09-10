import mongoose from 'mongoose'
mongoose.set('strictQuery', true)
import { print, OutputType } from '../helpers/print.js'
const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI)
    print('connect mongoose successfully', OutputType.SUCCESS)
    return connection
  } catch (error) {
    const { code } = error
    if (error.code == 8000) {
      throw new Error('Wrong database username and password')
    } else if (code == 'ENOTFOUND') {
      throw new Error('Wrong server name/connection string')
    }
    throw new Error('cannot connect to mongoose')
  }
}
export default connect
