import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    transactionNumber:{
        type:String,
        required:true,
        unique:true
    },
    uid:{
        type:String,
        required:true
    },
    feeAmount:{
        type:Number,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    paymentPeriod:{
        type:String,
        required:true
    },
    referenceNumber:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    photoUrl:{
        type:String,
        default:""
    },
    transactionDate:{
        type:Date,
        default:Date.now
    },
});

export default mongoose.model("payment", paymentSchema)