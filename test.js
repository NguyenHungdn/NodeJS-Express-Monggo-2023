import chalk from 'chalk'
var name = 'hoang'
const sum = (a, b) => {
  return a * b
}
console.log(chalk.yellowBright('name'))
console.log(chalk.yellowBright(sum(15, 16)))
