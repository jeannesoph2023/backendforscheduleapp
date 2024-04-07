import express from 'express'
import Form from "../models/FormModel.js"

const router = express.Router()
router.use(express.json())
router.post("/formdetails", async (req,res) =>{
    try{
        const newForm = new Form(req.body)
        const savedForm = await newForm.save()
        res.status(201).json(savedForm)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})
router.get("/formdetails", async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router