import Payment from '../model/paymentModel.js';

// pang create ng payment proof
export const createPayment = async(req,res) =>{
    try{
        const { uid } = req.body;
        if (!uid) {
            return res.status(400).json({ message: "Fields are required: uid" });
        }


        const newPayment = new Payment(req.body)

        const savedData = await newPayment.save();
        res.status(200).json({
            message: "Payment proof posted Sucessful!",
            data: savedData});
    }
    catch(error){
        res.status(500).json({errorMessage: error.message})
    }
};

// pang tawag sa payment proof
export const getPaymentByID = async(req,res) => {
    try {
        const uid = req.params.uid;
        const paymentExist = await Payment.find({uid});
        if(!paymentExist){
            return res.status(404).json({message:"payment proof not found"});
        }
        res.status(200).json(paymentExist)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}