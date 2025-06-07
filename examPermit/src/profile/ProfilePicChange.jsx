import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./profileStyle.module.css";
import busImg from "../assets/profile/bus.png";
import toast from "react-hot-toast";

function ProfilePicChange() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(busImg);
    const [filePath, setFilePath] = useState("");
    const uid = localStorage.getItem("uid");
    const fileInputRef = useRef(null);

    // Fetch the current profile picture on component mount
    useEffect(() => {
        const fetchStudentImage = async () => {
            if (!uid) return;

            try {
                const response = await axios.get(`http://localhost:8000/api/students/${uid}`);
                const profileUrl = response.data.profileUrl;

                if (profileUrl) {
                    setPreview(profileUrl);
                } else {
                    setPreview(busImg);
                }
            } catch (error) {
                console.error("Error fetching student image:", error);
                setPreview(busImg);
            }
        };
        fetchStudentImage();
    }, [uid]);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const isValid = ["image/png", "image/jpeg"].includes(file.type);
        if (!isValid) {
            toast.error("Only PNG or JPEG files are allowed.");
            setSelectedFile(null);
            setPreview(busImg);
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    // Trigger file input click
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Save the selected file
    const handleSave = async () => {
        if (!selectedFile) {
            toast.warn("Please select a file to upload.");
            return;
        }

        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleString("default", { month: "short" })}${currentDate.getDate()}`;
        const fileName = `${uid}_${formattedDate}`;
        const formData = new FormData();

        formData.append("file", selectedFile);
        formData.append("fileName", fileName);

        console.log("FormData fileName:", fileName);
        console.log("FormData file:", selectedFile);

        try {
            // Upload the file to the server
            const uploadRes = await axios.post(
                `http://localhost:8000/api/studentPic?fileName=${encodeURIComponent(fileName)}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const relativePath = uploadRes.data.filePath;
            setFilePath(relativePath);

            // Update the student's profile URL in the database
            await axios.put(`http://localhost:8000/api/students/${uid}`, {
                profileUrl: relativePath,
            });

            toast.success("Profile picture updated!");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload image.");
        }
    };

    // Clear the selected file and reset the preview
    const handleClear = () => {
        setSelectedFile(null);
        setPreview(busImg);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={styles.profilePicChangeContainer}>
            <img src={preview} alt="Current profile" className={styles.profilePicPreview} />
            {console.log("Current profile picture URL:", preview)}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
            />
            <div className={styles.buttonContainer}>
                <button className={styles.uploadButton} onClick={handleUploadClick}>
                    Upload
                </button>
                <button className={styles.saveButton} onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default ProfilePicChange;