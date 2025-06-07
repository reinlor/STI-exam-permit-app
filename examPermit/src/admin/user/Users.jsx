import axios from "axios";
import { useEffect, useState } from "react";
import userStyle from "./userStyle.module.css";
import defaultProfilePic from "../../assets/profile/placeholder.png";

import StudentInformation from "./studentInformation";
import Credentials from "./Credentials";
import BalanceInfo from "./BalanceInfo";

function Users() {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentID, setStudentID] = useState("");
    const [studentDataByID, setStudentDataByID] = useState([]);
    const [show, setShow] = useState(false);
    const [active, setActive] = useState('Profile');
    const [searchQuery, setSearchQuery] = useState("");
    const studentsPerPage = 4;

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(students.length / studentsPerPage);
    const paginationButtons = [];

    const handleOverlayClick = (e) => {
        if (e.target.className.includes(tuitionStyle.modalOverlay)) {
            toggleModal();
        }
    };
    const handleStudentClick = (student) => {
        setStudentID(student);
        getStudentDataByID(student);
        console.log(student);
    };

    const displayModule = (module) => {
        switch (module) {
            case 'Profile':
                return <StudentInformation studentID={studentID} />;
            case 'Credentials':
                return <Credentials studentID={studentID}/>
            case 'Balance':
                return <BalanceInfo studentID={studentID}/>
            default:
        }
    }

    const toggleModal = () => {
        setShow(!show);
        setActive('Profile');
    };

    const getStudentDataByID = async (studentID) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/students/${studentID}`);
            setStudentDataByID(response.data);
        } catch (error) {
            console.log("Error while fetching data", error);
        }
    }


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/students`);
                setStudents(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchStudentData();
    }, []);

    useEffect(() => {
        const fetchStudentByID = async () => {
            if (searchQuery.trim() === "") {
                const response = await axios.get(`http://localhost:8000/api/students`);
                setStudents(response.data);
            } else {
                try {
                    const response = await axios.get(`http://localhost:8000/api/students/${searchQuery}`);
                    setStudents(response.data ? [response.data] : []);
                } catch (error) {
                    console.log("Error while fetching student by ID", error);
                    setStudents([]);
                }
            }
        };
        fetchStudentByID();
    }, [searchQuery]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                className={`${userStyle.paginationButton} ${currentPage === i ? userStyle.activeButton : ""}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        );
    }

    const displayStudentData = currentStudents.map((element) => (
        <div
            className={userStyle.studentDataContainer}
            key={element.uid}
            onClick={() => { handleStudentClick(element.uid); toggleModal(); }}
        >
            <img src={element.profileUrl || defaultProfilePic} alt="Profile" className={userStyle.profilePic} />
            <div className={userStyle.studentInfoContainer}>
                <h3>{element.name}</h3>
                <h4>{element.uid}</h4>
                <p>Program: {element.program}</p>
                <p>Year Level: {element.yearLevel}</p>
            </div>
        </div>
    ));

    return (
        <div className={userStyle.userContainer}>
            <div className={userStyle.userBoxing}>
                <h1>Registered Users</h1>
            </div>
            <input
                placeholder="Search by Student ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={userStyle.searchInput}/>
            {displayStudentData}

            <div className={userStyle.paginationContainer}>
                {paginationButtons}
            </div>

            {show && (
                <div
                    className={`${userStyle.modalOverlay} ${show ? userStyle.fadeIn : ''}`}
                    onClick={handleOverlayClick}
                >
                    <div className={userStyle.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={userStyle.modalHeader}>
                            <h2>Student Data</h2>
                            <button className={userStyle.closeButton} onClick={toggleModal}>
                                ✕
                            </button>
                        </div>
                        <div className={userStyle.studentInfoNavigation}>
                            <div onClick={() => setActive('Profile')}>
                                Profile
                            </div>
                            <div onClick={() => setActive('Credentials')}>
                                Credentials
                            </div>
                        </div>
                        <div className={userStyle.studentFullInfoContainer}>
                            <div className={userStyle.basicInfoContainer}>
                                <img src={studentDataByID.profileUrl || defaultProfilePic} alt="Profile" className={userStyle.profilePic} />
                                <div className={userStyle.studentInfoContainer}>
                                    <h2>{studentDataByID.name}</h2>
                                    <h4>{studentDataByID.uid}</h4>
                                    <p>{studentDataByID.program}</p>
                                </div>
                            </div>
                            <div className={userStyle.displayModuleContainer}>
                                {displayModule(active)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;