import React, { useState, createContext } from "react"
import Navigation from "../components/navbar/Navigation";
import ProfileInformation from "./ProfileInformation.jsx";
import ProfilePicChange from "./ProfilePicChange.jsx";
import ProfileAboutMe from "./ProfileAboutMe.jsx";
import { useNavigate } from 'react-router-dom';
import styles from "./profileStyle.module.css";

function Profile() {
    const navigate = useNavigate();

    const userAccess = localStorage.getItem('role');
    if(userAccess !== 'Student'){
        window.location.href = '/';
    }

    return (
        <>
            <div className={styles.profilePageContainer}>
                <Navigation/>
                <div className={styles.logoutButtonContainer}>
                <button className={styles.logoutButton} onClick={
                    () => {
                        localStorage.removeItem('role');
                        localStorage.removeItem('uid');
                        navigate('/');
                    }
                    }>Logout</button>
            </div>
                <div className={styles.mainProfileContainer}>
                    <div className={styles.profileLeftContainer}>
                        <ProfileInformation />
                    </div>
                    <div className={styles.profileRightContainer}>
                        <ProfilePicChange />
                        <ProfileAboutMe />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile