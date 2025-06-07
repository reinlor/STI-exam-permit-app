import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import credentialsStyle from './credentialsStyle.module.css'

import showPassword from '../../assets/images/viewPass.png'
import hidePassword from '../../assets/images/hidePass.png'

function Credentials({ studentID = '' }) {
    const [userData, setUserData] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [passwordCondition, setPasswordCondition] = useState('password');
    const [passwordImg, setPasswordImg] = useState(hidePassword);

    function handlePasswordChange(event) { setPassword(event.target.value) }
    function handleRoleChange(event) { setRole(event.target.value) }

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

    useEffect(() => {
        if (studentID !== '') {
            const fetchStudentData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/students/${studentID}`);
                    setUserData(response.data);
                } catch (error) {
                    console.log("Error while fetching data", error);
                }
            };
            fetchStudentData();
            console.log(setUserData);
        }
    }, []);

    const updateUserData = async () => {
        try {
            const updatedUserData = {
                password: password
            };
            await axios.put(`http://localhost:8000/api/update/users/${studentID}`,
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

    const displayConfirmButton = () => {
        if (password !== '') {
            return <button className={credentialsStyle.updateButton}
                onClick={() => {
                    updateUserData();
                }}
            >
                Update User
            </button>
        }
    }

    return (
        <div className={credentialsStyle.credentialsContainer}>
            <h1>User Credentials</h1>
            <div className={credentialsStyle.credentialsInfo}>
                <div className={credentialsStyle.formGroup}>
                    <label>UID:</label>
                    <span>{userData.uid}</span>
                </div>

                <div className={credentialsStyle.formGroup}>
                    <label>Password:</label>
                    <div className={credentialsStyle.passwordInputContainer}>
                        <input
                            value={password}
                            type={passwordCondition}
                            defaultValue={userData.password}
                            onChange={handlePasswordChange}
                            className={credentialsStyle.inputField}
                        />
                        <img
                            className={credentialsStyle.passwordToggle}
                            src={passwordImg}
                            onClick={changePasswordImg}
                            alt="Toggle Password Visibility"
                        />
                    </div>
                </div>

                <div className={credentialsStyle.formGroup}>
                    <label>Role:</label>
                    <select onChange={handleRoleChange} disabled className={credentialsStyle.selectField}>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                {displayConfirmButton()}
            </div>
        </div>
    )
}

export default Credentials