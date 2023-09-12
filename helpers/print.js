import chalk from 'chalk'
const consoleStyles = {
  error: chalk.red,
  warning: chalk.yellow,
  success: chalk.green,
  default: chalk.white,
  information: chalk.white
}
const print = (message, style) => {
  console.log(style(message))
}

export { print, consoleStyles }
