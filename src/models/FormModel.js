import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    meansoftransportation:{
        type:String,
        required:true,
    },
    departureday:{
      type:String,
      required:true,
    },
    returnday:{
        type:String,
        required:true,
    },
   
    location:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    observation:{
         type:String,
         required:  false
    },
    userID:{
        type:String,
        required:true
    }
   
})

const Form = new mongoose.model('studentFormdetails', FormSchema)

export default Form;