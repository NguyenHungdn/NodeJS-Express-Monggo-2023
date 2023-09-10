const login = async ({ email, password }) => {
  console.log('login user in repository,haha')
}
const register = async ({ email, password, name, phoneNumber, address }) => {
  //validation already done
  console.log(`register with ${email}${name}${phoneNumber}${address}`)
}
export default {
  login,
  register
}
