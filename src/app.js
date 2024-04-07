import mongoose from "mongoose";
import express from "express";
import UserRoutes from "./routes/UserRoutes.js"
import FormRoutes from "./routes/FormRoutes.js"
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://ioanasofia300:Mongoose1234@cluster1.rkqkwqz.mongodb.net/WeekendPaper?retryWrites=true&w=majority&appName=Cluster1")

app.use('/', UserRoutes)
app.use('/', FormRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
app.listen(3001, () => console.log("hello, i'm running"))

