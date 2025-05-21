import Admin from '../model/adminModel.js';

// Pang create ng teacher data
export const createAdmin = async(req,res) =>{
    try{
        const newAdmin = new Admin(req.body)
        const {uid} = newAdmin;

        const adminExist = await Admin.findOne({uid})
        if(adminExist){
            return res.status(400).json({message: "admin data already exist"})
        }
        const savedData = await newAdmin.save();
        res.status(200).json({message: "admin data created Sucessful!"});
    }
    catch(error){
        res.status(500).json({errorMessage: error.message})
    }
};

// Pang tawag sa specific na admin gamit ang ID
export const getAdminByID = async(req,res) => {
    try {
        const uid = req.params.uid;
        const adminExist = await Admin.findOne({uid});
        if(!adminExist){
            return res.status(404).json({message:"admin data not found"});
        }
        res.status(200).json(adminExist)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

// Pang update ng teacher data
export const updateAdmin = async(req, res) => {
    try{
        const uid = req.params.uid;
        const adminExist = await Admin.findOne({uid});
        if(!adminExist){
            return res.status(404).json({message:"admin data not found"});
        }
        const updatedData = await Admin.findOneAndUpdate({uid}, req.body, {
            new: true
        });
        res.status(200).json(updatedData);
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}


// Pang delete ng teacher data
export const deleteAdmin = async(req, res)=>{
    try{
        const uid = req.params.uid;
        const adminExist = await Admin.findOne({uid});
        if(!adminExist){
            return res.status(404).json({message:"admin data not found"});
        }
        await Admin.findOneAndDelete({uid});
        res.status(200).json({message: "admin data deleted Successflly"});
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}