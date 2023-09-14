import express from 'express'
import chalk from 'chalk'
//authentication middlewaree
import checkToken from './authentication/auth.js'
import { usersRouter, studentsRouter } from './routes/index.js'
import connect from './database/database.js'
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT ?? 3000
const app = express()
connect()
app.use(express.json())
app.use(checkToken) //shield
//ROUTER
app.use('/users', usersRouter)
app.use('/students', studentsRouter)
app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, async (req, res) => {
  console.log(chalk.blue(`Server is running on ${port}`))
})
