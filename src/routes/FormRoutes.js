import express from 'express'
import Form from "../models/FormModel.js"
import jwt from "jsonwebtoken"

const router = express.Router()
router.use(express.json())
router.post("/formdetails", async (req, res) => {
    try {
        
            const newForm = new Form(req.body);
            const savedForm = await newForm.save();
            res.status(201).json(savedForm);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/formdetails", async (req, res) => {
     

    try {
        const verified = await jwt.verify(req.headers.authorization.split(" ")[1], 'secret')
        if(verified) {
        const forms = await Form.find().sort('name');
        res.status(200).json(forms);
        }else{
            res.status(401).json('Unauthorized')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }}
   
);
export default router