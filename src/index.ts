import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import myUserRoute from './routes/MyUserRoute'

mongoose
  .connect(process.env.MONGODB as string)
  .then(() => { console.log('Connected to MongoDB') })

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Delivery App' })
})

app.use('/api/my/user', myUserRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})