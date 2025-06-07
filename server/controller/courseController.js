import Course from '../model/courseModel.js';

// pang tawag sa specific na course
export const getCourseByLevel = async (req, res) => {
    try {
        const level = req.params.level;
        const courseExist = await Course.find({ level: level });
        if(!courseExist || courseExist.length === 0) {
            return res.status(404).json({ message: "course not found" });
        }
        res.status(200).json(courseExist);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

// pang tawag sa lahat ng course
export const getAllCourses = async (req, res) => {
    try {
        const courseData = await Course.find();
        if (!courseData || courseData.length === 0) {
            return res.status(404).json({ message: "course data not found" });
        }
        res.status(200).json(courseData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// pang create ng course
export const createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const {level} = newCourse;
        const courseExist = await Course.findOne({ level: level });
        if (courseExist) {
            return res.status(400).json({ message: "Course already exists" });
        }
        const savedCourse = await newCourse.save();
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

//pang update ng course
export const updateCourse = async (req, res) => {
    try {
        const level = req.params.level;
        const courseExist = await Course.find({ level: level });
        if (!courseExist) {
            return res.status(404).json({ message: "course not found" });
        }
        const updatedData = await Course.findOneAndUpdate({level}, req.body, {
            new: true
        });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// pang delete ng course
export const deleteCourse = async (req, res) => {
    try {
        const level = req.params.level;
        const courseExist = await Course.find({ level: level });
        if (!courseExist) {
            return res.status(404).json({ message: "course not found" });
        }
        await Course.findByIdAndDelete(level);
        res.status(200).json({ message: "course deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}