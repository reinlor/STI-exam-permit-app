import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    uid:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    profileUrl:{
        type:String,
        default:""
    },
});

export default mongoose.model("admin", teacherSchema)