import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'
export default function checkToken(req, res, next) {
  //bypass login,register
  // debugger
  if (
    req.url.toLowerCase().trim() == '/users/login'.toLowerCase().trim() ||
    req.url.toLowerCase().trim() == '/user/register'.toLowerCase().trim()
  ) {
    next()
    return
  }

  //other requests
  //get and validate token
  //debugger lấy ra req.headers.authorization tra gg
  const token = req.headers?.authorization?.split(' ')[1]
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
    const isExpired = Date.now() >= jwtObject.exp * 1000
    if (isExpired) {
      jwt.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token is expired'
      })
      res.end()
    } else {
      next()
    }
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message
    })
  }
  debugger
}
