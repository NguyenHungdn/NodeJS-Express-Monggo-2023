import { ObjectId, Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
import mongoose from 'mongoose'

const Student = mongoose.model(
  'Student',
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (name) => name.length > 3,
        message: 'Username must be at least 3 characters'
      }
    },
    email: {
      type: String,
      validate: {
        validator: isEmail,
        message: 'Email is incorrect format'
      }
    },
    languages: {
      type: [String] //this is an array
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: `{VALUE} is not supported`
      },
      required: true
    },

    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber) =>
          phoneNumber.length > 5 && phoneNumber.length <= 50,
        message: 'Phone number must be at least 5 characters, max: 20'
      }
    },
    address: {
      type: String,
      required: true
    }
  })
)
export default Student
