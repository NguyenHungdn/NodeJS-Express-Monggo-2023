import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { studentRepository } from '../repositories/index.js'
const getAllStudents = async (req, res) => {
  res.status(HttpStatusCode.OK).json({
    message: 'All students',
    data: [
      { name: 'nguyenvan A', email: 'nguyenvanA11@gmail.com', age: 20 },
      { name: 'nguyenvan B', email: 'nguyenvanA2234@gmail.com', age: 34 },
      { name: 'nguyenvan X', email: 'nguyenvanA2321@gmail.com', age: 23 },
      { name: 'nguyenvan Y', email: 'nguyenvan56@gmail.com', age: 54 }
    ]
  })
}
const getStudentById = async (req, res) => {}
const updateStudent = async (req, res) => {}
const insertStudent = async (req, res) => {
  try {
    const student = await studentRepository.insertStudent(req.body)
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Insert Student successfully',
      data: student
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Cannot insert student:' + error
    })
  }
}
export default { getAllStudents, getStudentById, updateStudent, insertStudent }
