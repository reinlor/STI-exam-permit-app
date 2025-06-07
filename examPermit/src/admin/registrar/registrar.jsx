import registrarStyle from './registrarStyle.module.css';
import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import showPass from '../../assets/images/viewPass.png';
import hidePass from '../../assets/images/hidePass.png'

function registrar() {
    const [sidUnique, setSidUnique] = useState('');
    const [uniqueMsgColor, setUniqueMsgColor] = useState('#b85a5a');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordImg, setPasswordImg] = useState(hidePass);

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [gender, setGender] = useState('');

    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');
    const [program, setProgram] = useState('BSIT');
    const [academicLevel, setAcademicLevel] = useState('College');
    const [semester, setSemester] = useState('');
    const [level, setLevel] = useState('');
    const [payment, setPayment] = useState('');

    const [hasScholarship, setHasScholarship] = useState(false);
    const [scholarshipName, setScholarshipName] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [discountPeriod, setDiscountPeriod] = useState('2025-2026');


    function updateStudentName(first, middle, last) {
        const fullName = `${last}, ${first} ${middle}`.trim();
        setStudentName(fullName);
    }
    function handleFirstNameChange(event) { const value = event.target.value; setFirstName(event.target.value); updateStudentName(value, middleName, lastName); }
    function handleMiddleNameChange(event) { const value = event.target.value; setMiddleName(event.target.value); updateStudentName(firstName, value, lastName); }
    function handleLastNameChange(event) { const value = event.target.value; setLastName(event.target.value); updateStudentName(firstName, middleName, value); }
    function handleStudentEmailChange(event) { setStudentEmail(event.target.value); }
    function handleAddressChange(event) { setAddress(event.target.value); }
    function handleContactNumberChange(event) { setContactNumber(event.target.value); }
    function handleGenderChange(event) { setGender(event.target.value); }

    const handleStudentIDChange = async (event) => {
        const newID = event.target.value;
        setStudentID(newID);
        const isValidFormat = /^02\d{9}$/.test(newID);

        if (!isValidFormat) {
            setSidUnique('Invalid Format');
            setUniqueMsgColor('#b85a5a');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/api/students');
            const existingIDs = response.data.map(student => student.uid);

            if (existingIDs.includes(newID) && isValidFormat) {
                setSidUnique('ID Already Taken');
                setUniqueMsgColor('#b85a5a');
            } else {
                setSidUnique('ID is Unique');
                setUniqueMsgColor('#558f55');
            }
        } catch (error) {
            console.error('Error while fetching data', error);
            setSidUnique('Error checking ID');
        }
    };
    function handlePasswordChange(event) { setPassword(event.target.value); }
    function handleProgramChange(event) { setProgram(event.target.value); }
    function handleAcademicLevelChange(event) { setAcademicLevel(event.target.value); }
    function handleSemesterChange(event) { setSemester(event.target.value); }
    function handleLevelChange(event) { setLevel(event.target.value); }
    function handlePaymentChange(event) { setPayment(event.target.value); }

    function handleHasScholarshipChange(event) { setHasScholarship(event.target.value === "true"); }
    function handleScholarshipNameChange(event) { setScholarshipName(event.target.value); }
    function handleDiscountPercentChange(event) { setDiscountPercent(event.target.value); }
    function handleDiscountPeriodChange(event) { setDiscountPeriod(event.target.value); }

    const addStudentData = async () => {
        try {
            const paymentStatus = payment === 'Full' ? 'Paid' : 'Prelims';
            console.log(paymentStatus);
            const newStudentData = {
                uid: studentID,
                name: studentName,
                academicLevel: academicLevel,
                yearLevel: level,
                semester: semester,
                gender: gender,
                payment: payment,
                program: program,
                address: address,
                contactNumber: contactNumber,
                studentEmail: studentEmail,
                paymentStatus: paymentStatus,
                discount: {
                    hasDiscount: hasScholarship,
                    discountName: scholarshipName,
                    period: discountPeriod,
                    discountFee: discountPercent
                }
            };
            await axios.post(`http://localhost:8000/api/students`,
                newStudentData
            );
            setSidUnique('')
            setUniqueMsgColor('#b85a5a')

            setFirstName('');
            setMiddleName('');
            setLastName('');
            setStudentEmail('');
            setAddress('');
            setContactNumber('');
            setStudentName('');
            setGender('');

            setStudentID('');
            setPassword('');
            setSemester('');
            setLevel('');
            setPayment('');

            setHasScholarship(false);
            setScholarshipName('');
            setDiscountPercent('');
            setPasswordVisible(false);

        } catch (error) {
            toast.error("Error while adding student", { position: "top-right" });
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
        if(!passwordVisible){
            setPasswordImg(showPass);
        }
        else{
            setPasswordImg(hidePass);
        }
    };

    const addStudentLogin = async () => {
        try {
            const newUser = {
                _id: studentID,
                password: password,
                role: 'Student',
            };
            await axios.post(`http://localhost:8000/api/users`,
                newUser
            );
        } catch (error) {
            toast.error("Error while adding user account", { position: "top-right" });
        }
    }

    const handleAddStudent = async () => {
        try {
            await addStudentData();
            await addStudentLogin();
            toast.success("Student and user account added successfully!", { position: "top-right" });
        } catch (error) {
            toast.error("Error while adding student or user account", { position: "top-right" });
        }
    };

    const displayConfirmButton = () => {
        const buttonElement = <button
            className={registrarStyle.addStudentButton}
            onClick={() => {
                handleAddStudent();
            }}
        >
            Add Student
        </button>
        if (
            firstName !== '' && middleName !== '' && lastName !== '' && studentEmail !== '' && address !== '' && contactNumber !== '' && gender !== ''
            && studentID !== '' && password !== '' && program !== '' && academicLevel !== '' && level !== '' && payment !== '' && sidUnique === 'ID is Unique'
        ) {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail);
            const isValidContactNumber = /^\d{11}$/.test(contactNumber);


            if (!hasScholarship && isValidEmail && isValidContactNumber) {
                return buttonElement
            }
            else {
                if (scholarshipName !== '' && discountPercent !== '' && discountPeriod !== '' && isValidEmail && isValidContactNumber) {
                    return buttonElement
                }
            }

        }
    }

    const displayScholarship = () => {
        if (hasScholarship) {
            return (
                <div className={registrarStyle.scholarshipContainer}>
                    <div className={registrarStyle.scholarshipGroup}>
                        <label className={registrarStyle.label}>Scholarship Name</label>
                        <input
                            value={scholarshipName}
                            type="text"
                            onChange={handleScholarshipNameChange}
                            className={registrarStyle.textInput}
                        />
                    </div>
                    <div className={registrarStyle.scholarshipGroup}>
                        <label className={registrarStyle.label}>Discount %</label>
                        <select
                            value={discountPercent}
                            onChange={handleDiscountPercentChange}
                            className={registrarStyle.selectInput}
                        >
                            <option value="">Select Percentage</option>
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="100">100%</option>
                        </select>
                    </div>
                    <div className={registrarStyle.scholarshipGroup}>
                        <label className={registrarStyle.label}>Period</label>
                        <input
                            type="text"
                            value={discountPeriod}
                            onChange={handleDiscountPeriodChange}
                            className={registrarStyle.textInput}
                        />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className={registrarStyle.registrarContainer}>
            <h1>Student Profile
                <span className={registrarStyle.idUniqueMsg}
                    style={{ color: uniqueMsgColor }}>
                    {sidUnique}
                </span>
            </h1>
            <div className={registrarStyle.registrarContent}>
                <div className={registrarStyle.registrarLeftContent}>
                    <div className={registrarStyle.formContainer}>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>First Name</label>
                            <input value={firstName}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleFirstNameChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Middle Name</label>
                            <input value={middleName}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleMiddleNameChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Last Name</label>
                            <input value={lastName}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleLastNameChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Student Email</label>
                            <input value={studentEmail}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleStudentEmailChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Address</label>
                            <input value={address}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleAddressChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Contact #</label>
                            <input value={contactNumber}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleContactNumberChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Gender</label>
                            <div className={registrarStyle.radioGroup}>
                                <input type='radio' id="male" name='gender' value="Male" onChange={handleGenderChange} />
                                <label htmlFor="male" className={registrarStyle.radioLabel}>Male</label>
                                <input type='radio' id="female" name='gender' value="Female" onChange={handleGenderChange} />
                                <label htmlFor="female" className={registrarStyle.radioLabel}>Female</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={registrarStyle.registrarRightContent}>
                    <div className={registrarStyle.formContainer}>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Student ID</label>
                            <input value={studentID}
                                type='text'
                                className={registrarStyle.textInput}
                                onChange={handleStudentIDChange} />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Password</label>
                            <div className={registrarStyle.passwordInputContainer}>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={registrarStyle.textInput}
                                />
                                <img
                                    src={passwordImg}
                                    alt="Toggle Password Visibility"
                                    className={registrarStyle.passwordToggle}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Program</label>
                            <input
                                type='text'
                                className={registrarStyle.textInput}
                                defaultValue={program}
                                onChange={handleProgramChange}
                                disabled
                            />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Level</label>
                            <input
                                type='text'
                                className={registrarStyle.textInput}
                                defaultValue={academicLevel}
                                onChange={handleAcademicLevelChange}
                                disabled
                            />
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Semester</label>
                            <select value={semester} onChange={handleSemesterChange} className={registrarStyle.selectInput}>
                                <option value="">Select Semester</option>
                                <option value="1st Sem">1st Sem</option>
                                <option value="2nd Sem">2nd Sem</option>
                            </select>
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Year Level</label>
                            <select value={level} onChange={handleLevelChange} className={registrarStyle.selectInput}>
                                <option value="">Select Level</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>
                        <div className={registrarStyle.formGroup}>
                            <label className={registrarStyle.label}>Payment</label>
                            <div className={registrarStyle.radioGroup}>
                                <input type='radio' id="full" name='payment' value="Full" onChange={handlePaymentChange} />
                                <label htmlFor="full" className={registrarStyle.radioLabel}>Full</label>
                                <input type='radio' id="monthly" name='payment' value="Monthly" onChange={handlePaymentChange} />
                                <label htmlFor="monthly" className={registrarStyle.radioLabel}>Monthly</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Scholarship</h2>
            <label className={registrarStyle.label}>
                Has Scholarship &nbsp;
                <div className={registrarStyle.radioGroup}>
                    <input type='radio' id="hasScholarship" name='schoolarship' value="true" onChange={handleHasScholarshipChange} />
                    <label htmlFor="hasScholarship" className={registrarStyle.radioLabel}>Yes</label>
                    <input type='radio' id="noScholarship" name='schoolarship' value="false" onChange={handleHasScholarshipChange} defaultChecked />
                    <label htmlFor="noScholarship" className={registrarStyle.radioLabel}>No</label>
                </div>
            </label><hr />

            {displayScholarship()}

            {displayConfirmButton()}
        </div>
    )
}

export default registrar;