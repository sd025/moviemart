import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import express from 'express'
import path from "path";
import userRoutes from './routes/userRoutes.js'
import moviesRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT || '4000'

app.use('/api/v1/users', userRoutes)
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
