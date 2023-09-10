import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import { usersRouter, studentsRouter } from './routes/index.js'
import connect from './database/database.js'
const port = process.env.PORT ?? 3000
const app = express()
connect()
app.use(express.json())
//ROUTER
app.use('/users', usersRouter)
app.use('/students', studentsRouter)
app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, async (req, res) => {
  console.log(`Server is running on ${port}`)
})
