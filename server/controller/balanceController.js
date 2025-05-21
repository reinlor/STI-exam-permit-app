import Balance from '../model/balanceModel.js';

// pang create ng balance
export const createBalance = async (req, res) => {
    try {
        const newBalance = new Balance(req.body)
        const { cid } = newBalance;

        const balanceExist = await Balance.findOne({ cid })
        if (balanceExist) {
            return res.status(400).json({ message: "Balance already exist" })
        }
        const savedData = await newBalance.save();
        res.status(200).json({ message: "Balance created Sucessful!" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

// pang update ng balance value
export const updateBalance = async (req, res) => {
    try {
        const cid = req.params.cid;
        const balanceExist = await Balance.findOne({cid});
        if (!balanceExist) {
            return res.status(404).json({ message: "Balance not found" });
        }
        const updatedData = await Balance.findOneAndUpdate({cid}, req.body, {
            new: true
        });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

// Pang tawag sa lahat ng balance
export const getAllBalance = async (req, res) => {
    try {
        const balanceData = await Balance.find();
        if (!balanceData || balanceData.length === 0) {
            return res.status(404).json({ message: "Balance data not found" });
        };
        res.status(200).json(balanceData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

// pang tawag sa specific na balance gamit ang ID
export const getBalanceByID = async (req, res) => {
    try {
        const cid = req.params.cid;
        const balanceExist = await Balance.findOne({cid});
        if (!balanceExist) {
            return res.status(404).json({ message: "Balance not found" });
        }
        res.status(200).json(balanceExist)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

// Pang delete ng Balance
export const deleteBalance = async(req, res)=>{
    try{
        const cid = req.params.cid;
        const balanceExist = await Balance.findOne({cid});
        if(!balanceExist){
            return res.status(404).json({message:"balance not found"});
        }
        await Balance.findOneAndDelete({cid});
        res.status(200).json({message: "Balance deleted Successflly"});
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}