import Users from '../model/userModel.js'

// pang login
export const loginUser = async (req, res) => {
    try {
        const { _id, password } = req.body;
        const user = await Users.findOne({ _id, password });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid SID or password" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Login successful",
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Pang create ng user
export const create = async(req,res) =>{
    try{
        const newUser = new Users(req.body)
        const {_id} = newUser;

        const userExist = await Users.findOne({_id})
        if(userExist){
            return res.status(400).json({message: "user already exist"})
        }
        const savedData = await newUser.save();
        res.status(200).json({message: "User created Sucessful!"});
    }
    catch(error){
        res.status(500).json({errorMessage: error.message})
    }
};

// Pang tawag sa lahat ng user
export const getAllUsers = async(req, res) => {
    try{
        const userData = await Users.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"user data not found"});
        };
        // res.status(200).json(userData);
        res.status(200).json(userData);
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

// Pang tawag sa specific na user gamit ang ID
export const getUserByID = async(req,res) => {
    try {
        const id = req.params.id;
        const userExist = await Users.findById(id);
        if(!userExist){
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json(userExist)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

// pang update ng user data
export const update = async(req, res) => {
    try{
        const id = req.params.id;
        const userExist = await Users.findById(id);
        if(!userExist){
            return res.status(404).json({message:"user not found"});
        }
        const updatedData = await Users.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json(updatedData);
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}

// pang delete ng user
export const deleteUser = async(req, res)=>{
    try{
        const id = req.params.id;
        const userExist = await Users.findById(id);
        if(!userExist){
            return res.status(404).json({message:"user not found"});
        }
        await Users.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted Successflly"});
    }catch(error){
        res.status(500).json({errorMessage: error.message})
    }
}