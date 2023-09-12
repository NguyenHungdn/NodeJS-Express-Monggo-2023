import mongoose, { Schema, ObjectId } from 'mongoose'
import isEmail from 'validator/lib/isemail.js'
const Klass = mongoose.model(
  'Klass',
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: 'ClassName must me at least 4 characters.Eg:c2110I'
      }
    }
  })
)
export default Klass
