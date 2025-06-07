import Students from "../model/studentModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "../examPermit/public/Profile");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        const safeFileName = `upload_${timestamp}${fileExtension}`;
        cb(null, safeFileName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, and PDF files are allowed."));
        }
    },
});


// Upload profile picture
export const uploadFile = (req, res) => {
    const uploadHandler = upload.single("file");

    uploadHandler(req, res, (err) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({ message: "File upload failed.", error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const filePath = `/Profile/${req.file.filename}`;
        console.log("Uploaded file:", req.file);
        console.log("Generated file path:", filePath);

        res.status(200).json({ filePath });
    });
};

// Student CRUD operations

export const createStudent = async (req, res) => {
    try {
        const { uid } = req.body;
        const exists = await Students.findOne({ uid });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newStudent = new Students(req.body);
        const saved = await newStudent.save();
        res.status(200).json({ message: "User created successfully!", data: saved });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Students.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getStudentByID = async (req, res) => {
    try {
        const { uid } = req.params;
        const student = await Students.findOne({ uid });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getStudentByName = async (req, res) => {
    try {
        const { name } = req.params;
        const student = await Students.findOne({ name });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { uid } = req.params;
        const updated = await Students.findOneAndUpdate({ uid }, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
