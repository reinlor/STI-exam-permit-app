import React, { useState, createContext, useEffect } from "react";
import Navigation from "../components/navbar/Navigation";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./permitStyle.module.css";
import ExamAttendanceForm from "./ExamAttendanceForm";

export const permitContext = createContext();

function Permit() {
    const [profile, setProfile] = useState({});
    const [subject, setSubject] = useState({});
    const uid = localStorage.getItem("uid");
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        sid: "",
        program: "",
        section: "",
        schoolYear: "2010-2011",
        term: "1st Term",
        course: ""
    });

    const userAccess = localStorage.getItem('role');
    if (userAccess !== 'Student') {
        window.location.href = '/';
    }

    const getProgramLevel = (yearLevel, semester) => {
        if (yearLevel === '1st Year' && semester === '1st Sem' && profile.program === 'BSIT') {
            return 'BSIT 1.1';
        } else if (yearLevel === '1st Year' && semester === '2nd Sem' && profile.program === 'BSIT') {
            return 'BSIT 1.2';
        } else if (yearLevel === '2nd Year' && semester === '1st Sem' && profile.program === 'BSIT') {
            return 'BSIT 2.1';
        } else if (yearLevel === '2nd Year' && semester === '2nd Sem' && profile.program === 'BSIT') {
            return 'BSIT 2.2';
        } else if (yearLevel === '3rd Year' && semester === '1st Sem' && profile.program === 'BSIT') {
            return 'BSIT 3.1';
        } else if (yearLevel === '3rd Year' && semester === '2nd Sem' && profile.program === 'BSIT') {
            return 'BSIT 3.2';
        } else if (yearLevel === '4th Year' && semester === '1st Sem' && profile.program === 'BSIT') {
            return 'BSIT 4.1';
        } else if (yearLevel === '4th Year' && semester === '2nd Sem' && profile.program === 'BSIT') {
            return 'BSIT 4.2';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/students/${uid}`);
                setProfile(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };

        fetchData();
    }, [uid]);

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const programLevel = getProgramLevel(profile.yearLevel, profile.semester);
                const response = await axios.get(`http://localhost:8000/api/courses/${programLevel}`);
                console.log("Subject API Response:", response.data);
                setSubject(Array.isArray(response.data) ? response.data[0] : response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchSubject();
    }, [profile]);

    useEffect(() => {
        setStudentInfo({
            name: profile.name || "",
            sid: profile.uid || "",
            program: getProgramLevel(profile.yearLevel, profile.semester) || "",
            section: subject.level || "",
            schoolYear: "2025-2026",
            term: profile.semester || "",
            course: Array.isArray(subject.subjects) ? subject.subjects : [],
            paymentTermStatus: profile.paymentStatus
        });
        console.log("Student Info:", studentInfo);
        console.log("Subject:", subject);
    }, [profile, subject]);

    const handleDownloadPDF = async () => {
        const element = document.getElementById("content-id");
        if (!element) {
            console.error("Content element not found!");
            return;
        }
    
        try {
            const scale = 3; // High scale for clarity
            const canvas = await html2canvas(element, {
                scale,
                useCORS: true,
            });
    
            const imgData = canvas.toDataURL("image/png");
    
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
            const targetHeight = pdf.internal.pageSize.getHeight() / 3; // 148.5mm
    
            // Calculate proportional width to maintain aspect ratio
            const imgWidth = (targetHeight * canvas.width) / canvas.height;
            const offsetX = (pageWidth - imgWidth) / 2; // Center horizontally
    
            pdf.addImage(imgData, "PNG", offsetX, 0, imgWidth, targetHeight);
            pdf.save("ExamPermit.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };
    
    

    return (
        <>
            <Navigation />
            <div>
                <div className={styles.permitContainer} id="content-id">
                    <permitContext.Provider value={studentInfo}>
                        <ExamAttendanceForm />
                    </permitContext.Provider>
                </div>
            </div>
            <div className={styles.toPdfContainer}>
                <button
                    onClick={handleDownloadPDF}>
                    Download PDF
                </button>
            </div>
        </>
    );
}

export default Permit;