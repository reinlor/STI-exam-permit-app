import styles from "./validationStyle.module.css";
import React, { useState, useRef } from "react";
import placeholderBg from "../assets/images/placeholderPayment.png";
import pdfIcon from "../assets/images/pdf-icon.png";
import axios from "axios";
import toast from "react-hot-toast";

function NotPaid({
    sid,
    name,
    currentPeriod,
    course,
    yearLevel,
    email,
    status,
    number,
    balance,
    hasOngoingPayment
}) {
    const [payment, setPayment] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(status);
    const [refNumber, setRefNumber] = useState("");
    const [filePath, setFilePath] = useState("");
    const uid = localStorage.getItem("uid");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handlePaymentChange = (event) => setPayment(event.target.value);
    const handleReferenceChange = (event) => setRefNumber(event.target.value);

    const addNewTransaction = async () => {
        if(hasOngoingPayment){
            toast.error("You already have an ongoing payment transaction.", { position: "top-right" });
            return;
        }
        if (!payment || !refNumber || !selectedFile) {
            toast.error("Please fill in all required fields and upload a file.", { position: "top-right" });
            return;
        }
    
        try {
            const currentDate = new Date();
            const formattedDate = `${currentDate.toLocaleString("default", { month: "short" })}${currentDate.getDate()}`;
            const fileName = `${uid}_${refNumber}_${formattedDate}`;
    
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("fileName", fileName);
    
            console.log("FormData fileName:", fileName);
            console.log("FormData file:", selectedFile);
    
            const uploadResponse = await axios.post(
                `http://localhost:8000/api/upload?fileName=${encodeURIComponent(fileName)}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
    
            const relativePath = uploadResponse.data.filePath;
            setFilePath(relativePath);
    
            const newPayment = {
                uid,
                feeAmount: balance,
                paymentMode: payment,
                paymentPeriod: currentPeriod,
                referenceNumber: refNumber,
                status: "Pending",
                photoUrl: relativePath,
            };

            const updateStatus = {
                hasOngoingPayment: true,
            }
    
            await axios.post(`http://localhost:8000/api/payment`, newPayment);
            await axios.put(`http://localhost:8000/api/students/${uid}`, updateStatus);
    
            toast.success("Payment and file uploaded successfully!", { position: "top-right" });
            setPayment("");
            setRefNumber("");
            setSelectedFile(null);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error("Error while adding payment transaction or uploading file.", { position: "top-right" });
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);

            const fileType = file.type;
            if (fileType.startsWith("image/")) {
                setPreview(URL.createObjectURL(file));
            } else if (fileType === "application/pdf") {
                setPreview("pdf");
            } else {
                setPreview(null);
                toast.error("Invalid file type. Please upload an image or PDF.", { position: "top-right" });
            }
        }
    };

    const handleUploadClick = () => fileInputRef.current.click();

    return (
        <>
            <div className={styles.leftRightContainer}>
                <div className={styles.paymentProofContainer}>
                    <div className={styles.paymentHeader}>
                        <h3>Proof of Payment</h3>
                        <div className={styles.separator}></div>
                    </div>

                    <div className={styles.paymentProofSeparator}>
                        <div className={styles.leftPaymentProof}>
                            <h4>Student Name</h4>
                            <p>{name}</p>

                            <h4>Program</h4>
                            <p>{course}</p>

                            <h4>Year Level</h4>
                            <p>{yearLevel}</p>

                            <h4>Email</h4>
                            <p>{email}</p>

                            <h4>Number</h4>
                            <p>{number}</p>
                        </div>

                        <div className={styles.rightPaymentProof}>
                            <h4>Payment Period</h4>
                            <p>{currentPeriod}</p>

                            <h4>Payment Method</h4>
                            <select className={styles.selectField} value={payment} onChange={handlePaymentChange}>
                                <option value="">Select an Option</option>
                                <option value="Gcash">Gcash</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Pay Maya">Pay Maya</option>
                            </select>

                            <h4>Reference Number</h4>
                            <input
                                type="text"
                                className={styles.inputField}
                                value={refNumber}
                                onChange={handleReferenceChange}
                                placeholder="Enter Reference Number"
                            />

                            <h4>Status</h4>
                            <p>{paymentStatus}</p>

                            <h4>Remaining Balance</h4>
                            <p>{balance}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.paymentUploadContainer}>
                    <div className={styles.uploadHeader}>
                        <h3>Upload Proof of Payment</h3>
                        <div className={styles.separator}></div>
                    </div>

                    <input
                        type="text"
                        readOnly
                        className={styles.filePath}
                        value={selectedFile ? selectedFile.name : ""}
                        placeholder="NO FILE SELECTED"
                    />

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                    />

                    <div className={styles.uploadContents}>
                        {preview ? (
                            preview === "pdf" ? (
                                <img src={pdfIcon} alt="PDF File" className={styles.placeholderBg} />
                            ) : (
                                <img src={preview} alt="Preview" className={styles.placeholderBg} />
                            )
                        ) : (
                            <img src={placeholderBg} alt="Placeholder" className={styles.placeholderBg} />
                        )}

                        <div className={styles.buttonContainer}>
                            <button className={styles.uploadButton} onClick={handleUploadClick}>
                                Upload
                            </button>

                            <button className={styles.submitButton} onClick={addNewTransaction}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotPaid;