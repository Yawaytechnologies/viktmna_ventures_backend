import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    mobileNumber:{type:String, required:true},
    address:{type:String, required:true},
    message:{type:String, required:true}
},{timestamps:true});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;