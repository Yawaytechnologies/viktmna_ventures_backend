import mongoose from "mongoose";


const investorSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{type: String, required:true, unique:true},
    mobileNumber:{type: String, required:true, unique:true},
    address:{type: String, required:true},
    pincode:{type: String, required:true},
    panNumber:{type: String, required:true, unique:true},
    investorType:{type: String, required:true, enum:['individual investor','HNI/ultra HNI','family office','institutional/fund','coparate statagic']},
    preferredStage:{type: String, required:true, enum:[
    'Seed Funding',
    'Startup Funding',
    'Early-Stage Funding',
    'Expansion-Stage Funding',
  ]},
    sectorsOfInterest:{type:String, required:true},
    logo:{type:String},
    document:{type:String},
    slab:{type:String, required:true, enum:['micro','small','medium','large']},
    slabDetails:{
        range:{type:String},
        payment:{type:String}
    },
    anythingElse:{type:String}
},
{timestamps:true});

const Investor = mongoose.model('Investor', investorSchema);

export default Investor;