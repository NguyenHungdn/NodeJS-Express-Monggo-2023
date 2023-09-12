import HttpStatusCode from '../exceptions/HttpStatusCode.js'
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
const insertStudent = async (req, res) => {}
export default { getAllStudents, getStudentById, updateStudent, insertStudent }
