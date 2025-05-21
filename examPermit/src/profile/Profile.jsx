import React, { useState, createContext } from "react"
import Navigation from "../components/navbar/Navigation";
import ProfileInformation from "./ProfileInformation.jsx";
import ProfilePicChange from "./ProfilePicChange.jsx";
import ProfileAboutMe from "./ProfileAboutMe.jsx";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <Navigation />
                <ProfileInformation />
                <ProfilePicChange />
                <ProfileAboutMe />
            </div>
            <button onClick={() => navigate('/')}>Logout</button>
        </>
    )
}

export default Profile