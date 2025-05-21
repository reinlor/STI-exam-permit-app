import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    level:{
        type:String,
        require:true
    },
    subjects:{
        type:Array,
        default:[]
    }
})

export default mongoose.model("course", courseSchema)