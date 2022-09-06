import mongoose from "mongoose"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import todoRoute from "./routes/todo.route.js"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"

//express
const app = express()

//read env file
dotenv.config()

//mongodb connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB success connected"))
    .catch((err) => console.log(`MongoDB : ${err}`))

//const originClient = process.env.ORIGIN_CLIENT     

app.use(cors()) // inject originClient to this
app.use(helmet())    
app.use(express.json())
app.use('/api/todolist',todoRoute)   
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)

app.listen(process.env.SERV_PORT,() => {
    console.log("backend server is connected")
 })   

