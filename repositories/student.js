import Exception from '../exceptions/Exception.js'
import { consoleStyles, print } from '../helpers/print.js'
import { Student } from '../models/index.js'
import { faker } from '@faker-js/faker'
const getAllStudent = async ({ page, size, searchString }) => {
  //aggregate data for all students
  page = parseInt(page)
  size = parseInt(size)
  //searchString? name,email, address, contains searchString
  let filteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: `.*${searchString}.*`, $options: 'i' } }, //ignore case
          { email: { $regex: `.*${searchString}.*`, $options: 'i' } },
          { address: { $regex: `.*${searchString}.*`, $options: 'i' } }
        ]
      }
    },
    {
      $skip: (page - 1) * size
    },
    {
      $limit: size
    }
  ])
  return filteredStudents
}
const getDetailStudent = async (studentId) => {
  const student = await Student.findById(studentId)
  if (!student) {
    throw new Exception('cannot find Student with id' + studentId)
  }
  return student //default value
}
//languages: "engLish,Vietnamese"
const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address
}) => {
  // add students
  try {
    debugger
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address
    })
    return student
  } catch (exception) {
    // error from validation. error
    if (!!exception.errors) {
      //error from validations
      throw new Exception('Input error:', exception.errors)
    }
    debugger
  }
  debugger
}
//Update
const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address
}) => {
  const student = await Student.findById(id)
  student.name = name ?? student.name
  student.email = email ?? student.email
  student.languages = languages ?? student.languages
  student.gender = gender ?? student.gender
  student.phoneNumber = phoneNumber ?? student.phoneNumber
  student.address = address ?? student.address
  await student.save()
  return student
}
//create fake student data
async function generateFakeStudents() {
  let fakeStudents = []
  for (let i = 0; i < 500; i++) {
    let fakeStudent = {
      name: `${faker.name.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(['English', 'Vietnamese', 'Japanese']),
        faker.helpers.arrayElement(['Korean', 'Chinese', 'French'])
      ],
      gender: faker.helpers.arrayElement(['Male', 'Female']),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress()
    }
    fakeStudents.push(fakeStudent)
  }
  await Student.insertMany(fakeStudents)
}
export default {
  getAllStudent,
  insertStudent,
  generateFakeStudents,
  getDetailStudent,
  updateStudent
}
// function generateFakeStudents() {
//   ;[...Array(1000).keys()].forEach(async (index) => {
//     let fakeStudent = {
//       name: `${faker.name.fullName()}-fake`,
//       email: faker.internet.email(),
//       languages: [
//         faker.helpers.arrayElement(['English', 'Vietnamese', 'Japanese']),
//         faker.helpers.arrayElement(['Korean', 'Chinese', 'French'])
//       ],
//       gender: faker.helpers.arrayElement(['Male', 'Female']),
//       phoneNumber: faker.phone.number(),
//       address: faker.address.streetAddress()
//     }
//     debugger
//     await Student.create(fakeStudent)
//     print(
//       `Inserted student with name ${fakeStudent.name}`,
//       consoleStyles.information
//     )
//   })
// }
