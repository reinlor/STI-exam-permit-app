import React, { useState, useEffect } from "react";
import axios from "axios";
import studentInfoStyle from "./studentInformationStyle.module.css";
import toast from "react-hot-toast";

function StudentInformation({studentID = ''}) {
    const [studentData, setStudentData] = useState({});
    console.log(studentID);

    useEffect(() => {
        if (studentID !== '') {
            const fetchStudentData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/students/${studentID}`);
                    setStudentData(response.data);
                } catch (error) {
                    toast.error("Error while fetching data", error);
                }
            };
            fetchStudentData();
        }
    }, [studentID]);

    useEffect(() => {
        console.log("Updated Student Data:", studentData.name);
    }, [studentData]);

    return (
        <div className={studentInfoStyle.studentDataContainer}>
            <h1>Student Information</h1>
            <div className={studentInfoStyle.studentInformationGrid}>
            <div><span>Student ID:</span> <strong>{studentData.uid}</strong></div>
            <div><span>Name:</span> <strong>{studentData.name}</strong></div>
            <div><span>Gender:</span> <strong>{studentData.gender}</strong></div>
            <div><span>Address:</span> <strong>{studentData.address}</strong></div>
            <div><span>Contact Number:</span> <strong>{studentData.contactNumber}</strong></div>
            <div><span>Student Email:</span> <strong>{studentData.studentEmail}</strong></div>
            <div><span>Academic Level:</span> <strong>{studentData.academicLevel}</strong></div>
            <div><span>Program:</span> <strong>{studentData.program}</strong></div>
            <div><span>Year Level:</span> <strong>{studentData.yearLevel}</strong></div>
            <div><span>Semester:</span> <strong>{studentData.semester}</strong></div>
            <div><span>Ongoing Payment:</span> <strong>{studentData.paymentStatus}</strong></div>
        </div>
</div>

    )
}

export default StudentInformation;