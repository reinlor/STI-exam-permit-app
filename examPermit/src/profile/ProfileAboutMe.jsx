import React, { useContext, useEffect, useState } from "react"
import axios from "axios";
import toast from 'react-hot-toast';
import styles from "./profileStyle.module.css";


import showPassword from '../assets/images/viewPass.png'
import hidePassword from '../assets/images/hidePass.png'

function ProfileAboutMe() {
    const [aboutMe, setAboutMe] = useState('');
    const uid = localStorage.getItem('uid');

    const [password, setPassword] = useState('');
    const [passwordCondition, setPasswordCondition] = useState('password');
    const [passwordImg, setPasswordImg] = useState(hidePassword);

    useEffect(() => {
        console.log(uid);
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/students/${uid}`);
                const { aboutMe } = response.data;
                setAboutMe(aboutMe);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData();
    }, [])

    function handleAboutMeChange(event) {
        setAboutMe(event.target.value)
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    function clearAboutMeChange() {
        setAboutMe('')
    }

    const updateAboutMe = async () => {
        try {
            const updatedAboutMe = {
                aboutMe: aboutMe
            };
            await axios.put(`http://localhost:8000/api/students/${uid}`,
                updatedAboutMe
            );
            toast.success("Profile updated succesfully", { position: "top-right" });
        } catch (error) {
            toast.error("Error while updating profile", { position: "top-right" });
        }
    }

    const updateUserData = async () => {
        try {
            const updatedUserData = {
                password: password
            };
            await axios.put(`http://localhost:8000/api/update/users/${uid}`,
                updatedUserData
            );
            toast.success("Password Updated Successfully", { position: "top-right" });
            setPassword(ps => ps = '');
            setPasswordCondition(pc => pc = 'password');
            setPasswordImg(pi => pi = hidePassword);
        } catch (error) {
            toast.error("Error updating student password", { position: "top-right" });
        }
    }

    const changePasswordImg = () => {
        if (passwordCondition === 'password') {
            setPasswordCondition(pc => pc = 'text');
            setPasswordImg(pi => pi = showPassword);
        }
        else if (passwordCondition === 'text') {
            setPasswordCondition(pc => pc = 'password');
            setPasswordImg(pi => pi = hidePassword);
        }
    }

    return (
        <>
            <div className={styles.profileAboutMeContainer}>
                <h2>About Me</h2>
                <textarea value={aboutMe} onChange={handleAboutMeChange} />
                <div className={styles.buttonContainer}>
                    <button className={styles.clearButton} onClick={clearAboutMeChange}>Clear</button>
                    <button className={styles.saveButton} onClick={updateAboutMe}>Save</button>
                </div>
            </div>
            <div className={styles.profileAboutMeContainer}>
                <h2>Change Password</h2>
                <div className={styles.passwordInputContainer}>
                    <input
                        value={password}
                        type={passwordCondition}
                        onChange={handlePasswordChange}
                        className={styles.inputField}
                    />
                    <img
                        className={styles.passwordToggle}
                        src={passwordImg}
                        onClick={changePasswordImg}
                        alt="Toggle Password Visibility"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.saveButton} onClick={updateUserData}>Save</button>
                </div>
            </div>
        </>
    )
}

export default ProfileAboutMe