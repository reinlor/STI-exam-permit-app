import Students from "../model/studentModel.js";

// pang create ng student data
export const createStudent = async(req,res) =>{

    try{
        const newStudent = new Students(req.body)
        const {uid} = newStudent;
        

        const studentExist = await Students.findOne({uid})
        if(studentExist){
            return res.status(400).json({message: "user already exist"})
        }
        const savedData = await newStudent.save();
        res.status(200).json({
            message: "User created Sucessful!",
            data: savedData
        });
    }
    catch(error){
        res.status(500).json({errorMessage: error.message})
    }
};

// Pang tawag sa lahat ng student data
export const getAllStudents = async(req, res) => {
    try{
        const studentData = await Students.find();
        if(!studentData || studentData.length === 0){
            return res.status(404).json({message:"Student data not found"});
        };
        res.status(200).json(studentData);
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

// pang tawag sa specific na student gamit ang UID
export const getStudentByID = async(req, res) => {
    try {
        const uid = req.params.uid;
        const studentExist = await Students.findOne({uid});
        if(!studentExist){
            return res.status(404).json({message:"Student data not found"});
        }
        res.status(200).json(studentExist)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

// pang tawag sa specific na student gamit ang UID
export const getStudentByName = async(req, res) => {
    try {
        const name = req.params.name;
        const studentExist = await Students.findOne({name});
        if(!studentExist){
            return res.status(404).json({message:"Student data not found"});
        }
        res.status(200).json(studentExist)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const updateStudent = async(req, res) => {
    try{
            const uid = req.params.uid;
            const studentExist = await Students.findOne({uid});
            if(!studentExist){
                return res.status(404).json({message:"student data not found"});
            }
            const updatedData = await Students.findOneAndUpdate({uid}, req.body, {
                new: true
            });
            res.status(200).json(updatedData);
        }catch(error){
            res.status(500).json({errorMessage: error.message})
        }
}