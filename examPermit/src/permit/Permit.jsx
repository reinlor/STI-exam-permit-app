import React, { useState, createContext, useEffect } from "react";
import Navigation from "../components/navbar/Navigation";
import axios from "axios";
import styles from "./permitStyle.module.css";
import ExamAttendanceForm from "./ExamAttendanceForm";

export const permitContext = createContext();

function Permit() {
    const [profile, setProfile] = useState({});
    const [subject, setSubject] = useState({});
    const uid = sessionStorage.getItem("uid");
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        sid: "",
        program: "",
        section: "",
        schoolYear: "2010-2011",
        term: "1st Term",
        course: ""
    });

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
                const programLevel = "BSIT 3.1";
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
            program: profile.program || "",
            section: subject.level || "",
            schoolYear: "2010-2011",
            term: "1st Term",
            course: Array.isArray(subject.subjects) ? subject.subjects : []
        });
        console.log("Student Info:", studentInfo);
        console.log("Subject:", subject);
    }, [profile, subject]);

    return (<>
        <Navigation />
        <div className={styles.permitContainer}>
            <permitContext.Provider value={studentInfo}>
                <ExamAttendanceForm />
            </permitContext.Provider>
        </div>
    </>
    );
}

export default Permit;