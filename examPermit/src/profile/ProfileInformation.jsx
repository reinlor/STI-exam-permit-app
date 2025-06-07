import React, { useEffect, useState, useContext } from "react"
import axios from "axios";
import toast from 'react-hot-toast';
import styles from "./profileStyle.module.css";

function ProfileInformation() {
    const [profile, setProfile] = useState({});
    const uid = localStorage.getItem('uid');

    useEffect(() => {
        console.log(uid);
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/students/${uid}`);
                setProfile(response.data)
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData();
    }, [])

    const updateData = async () =>{
        try {
            const updatedProfile = {
                address: profile.address,
                contactNumber: profile.contactNumber,
                studentEmail: profile.studentEmail
            };
            await axios.put(`http://localhost:8000/api/students/${uid}`,
                updatedProfile
            );
            toast.success("Profile updated Succesful!", {position: "top-right"});
        } catch (error) {
            toast.error("Error while updating profile", {position: "top-right"});
        }
    }

    console.log(profile);

    function handleAddressChange(event) { setProfile(p => ({ ...p, address: event.target.value })) };
    function handleContatNumberChange(event) { setProfile(p => ({ ...p, contactNumber: event.target.value })) };
    function handleStudentEmailChange(event) { setProfile(p => ({ ...p, studentEmail: event.target.value })) };

    return (
        <div className={styles.profileInformationContainer}>
            <div className={styles.profileInformationHeader}>
                <h3>Information</h3>
                <label>Name:<input type="text" value={profile.name}
                    readOnly /></label><br />
                <label>Student ID:<input type="text" value={profile.uid}
                    readOnly /></label><br />
                <label>Academic Level:<input type="text" value={profile.academicLevel}
                    readOnly /></label><br />
                <label>Year Level:<input type="text" value={profile.yearLevel}
                    readOnly /></label><br />
                <label>Program:<input type="text" value={profile.program}
                    readOnly /></label><br />

                <h3>Contacts</h3>
                <label>Address:<input type="text" value={profile.address}
                    onChange={handleAddressChange} /></label><br />
                <label>Contact Number:<input type="text" value={profile.contactNumber}
                    onChange={handleContatNumberChange} /></label><br />
                <label>Student Email:<input type="text" value={profile.studentEmail}
                    onChange={handleStudentEmailChange} /></label><br />

                <button className={styles.saveButton} onClick={updateData}>Save Changes</button>
            </div>
        </div>
    );
}

export default ProfileInformation