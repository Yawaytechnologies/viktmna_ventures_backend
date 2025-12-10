import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
    startupName:{type:String, required:true},
    website_link:{type:String, required:true},
    address:{type:String, required:true},
    year_founded:{type:Number, required:true},
    entity_type:{type:String, required:true, enum:['private limited company','partnership/proprietorship','limited liability partnership','not registered','others']},
    sector:{type:String, required:true, enum:['Emerging technology/SaaS','Digital & consumer interner','climate & sustainablity','fintech','healthtech/lifesciences','Agri/Food/Rural','others']},
    founder_name:{type:String, required:true},
    founder_email:{type:String, required:true, unique:true},
    mobile_number:{type:String, required:true, unique:true},
    linkedin_profile:{type:String},
    problem_statement:{type:String, required:true},
    solution_overview:{type:String, required:true},
    current_stage:{type:String, required:true, enum:['idea/pre-MVP','MVP in market','early revenue','scaling/growth']},
    traction_metrics:{type:String},
    capital_raised_so_far:{type:String},
    capital_you_are_looking_for:{type:String, required:true},
    slab:{type:String, required:true, enum:['micro','small','medium','large']},
    slabDetails:{
        range:{type:String},
        payment:{type:String}
    },
    logo:{type:String}
},{timestamps:true
    
})

const Startup = mongoose.model('Startup', startupSchema);

export default Startup;