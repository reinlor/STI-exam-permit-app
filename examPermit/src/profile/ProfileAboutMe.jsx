import React, { useContext, useEffect, useState } from "react"
import axios from "axios";
import toast from 'react-hot-toast';

function ProfileAboutMe() {
    const [aboutMe, setAboutMe] = useState('');
    const uid = sessionStorage.getItem('uid');

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
    },[])

    function handleAboutMeChange(event) {
        setAboutMe(event.target.value)
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
            toast.success("Profile updated succesfully", {position: "top-right"});
        } catch (error) {
            toast.error("Error while updating profile", {position: "top-right"});
        }
    }

    return (
        <div>
            <textarea value={aboutMe} onChange={handleAboutMeChange} />
            <button onClick={clearAboutMeChange}>Clear</button>
            <button onClick={updateAboutMe}>Save</button>
        </div>
    )
}

export default ProfileAboutMe