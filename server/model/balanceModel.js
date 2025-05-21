import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    cid:{
        type:String,
        require:true
    },
    tuitionFee:{
        type:Number,
        require:true
    },
    otherSchoolFee:{
        type:Number,
        require:true
    },
    miscellaneousFee:{
        type:Number,
        require:true
    },
    schoolYear:{
        type:String,
        require:true
    },
    schoolTerm:{
        type:String,
        require:true
    },
});

export default mongoose.model("balance", userSchema)