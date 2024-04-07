import express from 'express';
import Student from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


const router = express.Router();
router.use(express.json());
router.post("/authentication", async (req,res) =>{
    try{
        const {username,email,password} = req.body
        const existingStudent = await Student.find({email})
        if (!(existingStudent.length ===0)) {
            return res.status(400).json({ message: 'You have already an account with this email.Please go and' });
          }else{
       
        const hashedPassword = await bcrypt.hash(password,10)
        const newStudent = new Student({username, email, password:hashedPassword});
        const savedUser = await newStudent.save();
        res.status(201).json({ message: ['User registered successfully', savedUser] })
    }
    }catch(error) {
        res.status(400).json({ message: error.message })
    }
})
router.post("/login", async (req, res) => {
    try {
        const { password, email } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
       
            return res.status(401).json({ message: "User with this email does not exist" });
        }
        const passwordMatched = await bcrypt.compare(password, student.password);
        if (passwordMatched === false) {
           
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id : student._id }, 'secret');
        res.status(200).json({ token, userID: student._id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;