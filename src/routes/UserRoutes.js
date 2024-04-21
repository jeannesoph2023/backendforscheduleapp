import express from 'express';
import Student from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


const router = express.Router();
router.use(express.json());
//functions

function isValidEmail(email) {
   
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function isValidPassword(password) {
    
    if (password.length < 8) {
      return false;
    }
  
   
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
   
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
   
    if (!/\d/.test(password)) {
      return false;
    }
  
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
    }
  
    
    return true;
  }

router.post("/authentication", async (req,res) =>{
    try{
        const {username,email,password} = req.body
        const existingStudent = await Student.find({email})

        if (!(existingStudent.length ===0)) {
            return res.status(400).json({ message: 'You have already an account with this email.Please go and' });
          }else{
        if (!isValidEmail(email)) {
                res.status(400).json({message: 'Invalid email address' });
                return;}
        if(!isValidPassword(password)){
            res.status(400).json({message:
                "Password should contain at least 8 characters, one uppercase letter,one lowercase letter,one number, one special character"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newStudent = new Student({username, email, password:hashedPassword});
        const savedUser = await newStudent.save();
        res.status(201).json({ message: ['User registered successfully', savedUser] })
    }
    }catch(error) {
        res.status(400).json({ message: "Email/Username/Password is missing" })
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
        const token = jwt.sign({ id : student._id, 'role':'student_role'}, 'secret');
        res.status(200).json({ token, userID: student._id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/getUsers", async (req,res) =>{
    
    try{
       const verified = await jwt.verify(req.headers.authorization.split(" ")[1], 'secret')
       if(verified){
       const users = await Student.find();
       res.status(200).json(users)
       } else { res.status(401).json("Unauthorized")}
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }

})

export default router;