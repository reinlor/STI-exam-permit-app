import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }
})

export default mongoose.model("users", userSchema)