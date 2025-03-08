import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import express from 'express'
import path from "path";
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT || '4000'

app.use('/api/v1/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
