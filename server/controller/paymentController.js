import Payment from '../model/paymentModel.js';
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "../examPermit/public/PaymentProof");
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

        const filePath = `/PaymentProof/${req.file.filename}`;
        console.log("Uploaded file:", req.file);
        console.log("Generated file path:", filePath);

        res.status(200).json({ filePath });
    });
};

// Other payment-related functions (e.g., createPayment, getPaymentByID, etc.) remain unchanged

// pang create ng payment proof
export const createPayment = async (req, res) => {
    try {
        const { uid, feeAmount, paymentMode, paymentPeriod } = req.body;

        if (!uid || !feeAmount || !paymentMode || !paymentPeriod) {
            return res.status(400).json({ message: "Fields are required: uid, feeAmount, paymentMode, paymentPeriod" });
        }

        const count = await Payment.countDocuments();
        const nextNumber = 100000000 + count + 1;

        const newPayment = new Payment({
            ...req.body,
            transactionNumber: nextNumber.toString(),
        });

        const savedData = await newPayment.save();
        res.status(200).json({
            message: "Payment proof posted successfully!",
            data: savedData,
        });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// pang tawag sa payment proof
export const getPaymentByID = async (req, res) => {
    try {
        const uid = req.params.uid;
        const paymentExist = await Payment.find({ uid });
        if (!paymentExist) {
            return res.status(404).json({ message: "payment proof not found" });
        }
        res.status(200).json(paymentExist)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

// pang tawag sa payment proof gamit transactionId
export const getPaymentByTransactionID = async (req, res) => {
    try {
        const transactionNumber = req.params.transactionNumber;
        const paymentExist = await Payment.find({ transactionNumber });
        if (!paymentExist) {
            return res.status(404).json({ message: "payment proof not found" });
        }
        res.status(200).json(paymentExist)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

// pang tawag sa payment proof na pending
export const getPendingPayment = async (req, res) => {
    try {
        const status = req.params.status;
        const uid = req.params.uid;
        const paymentExist = await Payment.find({ uid });
        const showPending = await Payment.find({ status });
        if (!paymentExist) {
            return res.status(404).json({ message: "payment proof not found" });
        }
        res.status(200).json(showPending)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

// pang update
export const updatePaymentStatus = async (req, res) => {
    try {
        const transactionNumber = req.params.transactionNumber;
        const transactionExist = await Payment.find({ transactionNumber: transactionNumber });
        if (!transactionExist) {
            return res.status(404).json({ message: "course not found" });
        }
        const updatedData = await Payment.findOneAndUpdate({ transactionNumber }, req.body, {
            new: true
        });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};