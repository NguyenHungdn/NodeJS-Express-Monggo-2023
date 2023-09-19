import { MAX_RECORDS } from '../Global/constants.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { studentRepository } from '../repositories/index.js'
const getAllStudents = async (req, res) => {
  //localhost:3002?page=1&size=100
  let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query
  size = size >= MAX_RECORDS ? MAX_RECORDS : size

  try {
    let filteredStudents = await studentRepository.getAllStudent({
      size,
      page,
      searchString
    })
    res.status(HttpStatusCode.OK).json({
      message: 'All students',
      size: filteredStudents.length,
      page,
      searchString,
      data: filteredStudents
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message
    })
  }
}
const getStudentById = async (req, res) => {
  let studentId = req.params.id
  studentRepository.getDetailStudent(studentId)
  try {
    const student = await studentRepository.getDetailStudent(studentId)
    res.status(HttpStatusCode.OK).json({
      message: 'Get detail student successfully',
      data: student
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message
    })
  }
}
const updateStudent = async (req, res) => {
  const { id, name, email, languages, gender, phoneNumber, address } = req.body
  //not validate!
  try {
    const student = await studentRepository.updateStudent(req.body)
    res.status(HttpStatusCode.OK).json({
      message: 'Update student successfully',
      data: student
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message
    })
  }
}
const insertStudent = async (req, res) => {
  try {
    const student = await studentRepository.insertStudent(req.body)
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Insert Student successfully',
      data: student
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Cannot insert student:' + exception,
      validationErrors: exception.validationErrors
    })
  }
}
async function generateFakeStudents(req, res) {
  debugger
  await studentRepository.generateFakeStudents(req.body)
  res.status(HttpStatusCode.INSERT_OK).json({
    message: 'Insert fake Students successfully'
  })
}
export default {
  getAllStudents,
  getStudentById,
  updateStudent,
  insertStudent,
  generateFakeStudents //shoule be private
}
