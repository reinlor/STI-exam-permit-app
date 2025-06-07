import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import styles from './loginStyle.module.css';
import toast from 'react-hot-toast';
import stiLogo from '../assets/images/trackflow-logo.png';

import showPasswordIcon from '../assets/images/viewPass.png';
import hidePasswordIcon from '../assets/images/hidePass.png';


function Login() {
    const navigate = useNavigate();
    const [_id, setSid] = useState('');
    const [password, setPass] = useState('');
    const [showPassword, setShowPassword] = useState('password');
    const [eyes, setEyes] = useState(hidePasswordIcon);
    if (_id !== '') {
        localStorage.setItem('uid', _id);
    }

    const userAccess = localStorage.getItem('role');
    useEffect(() => {
        if (userAccess === 'Admin') {
            navigate("/admin");
        }
        else if (userAccess === 'Student') {
            navigate("/homepage");
        }
    }, [userAccess, navigate]);

    const handleLogin = async () => {

        if (_id === '' || password === '') {
            toast.error("Please fill in all required fields.", { position: "top-right" });
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/login`, {
                _id,
                password
            });

            if (response.data.success) {
                localStorage.setItem('role', response.data.role);
                console.log(localStorage.getItem('role'));
                if (response.data.role === 'Admin') {
                    navigate("/admin");
                }
                else if (response.data.role === 'Student') {
                    navigate("/homepage");
                }
                toast.success("Login Succesful!", { position: "top-right" });
            }
            else {

            }


        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Incorrect Id or password.", { position: "top-right" });
            }
            console.log("Error while fetching data", error)
        }
    };

    const updateSid = (e) => { setSid(e.target.value) };
    const updatePass = (e) => { setPass(e.target.value) };
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && password !== '' && _id !== '') {
            event.preventDefault();
            console.log("Enter key pressed");
            handleLogin();
        }
    };

    const displayPassword = () => {
        if (showPassword === 'password' && eyes === hidePasswordIcon) {
            setShowPassword('text');
            setEyes(showPasswordIcon);
        }
        else {
            setShowPassword('password');
            setEyes(hidePasswordIcon);
        }
    }



    return (
        <>
            <div className={styles.loginBody}>
                <div className={styles.loginContainer}>
                    <img className={styles.stiLogo} src={stiLogo} alt='STI Logo'></img>
                    <h1>Welcome!</h1><br></br>
                    <h2>Login to STI TRACKFLOW</h2>
                    <form className={styles.loginForm}>
                        <div>
                            <label htmlFor="sid">
                                <span>@</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Student Number"
                                id='sid'
                                onChange={updateSid}
                                onKeyDown={handleKeyDown} />
                        </div>

                        <div>
                            <label htmlFor="pass">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" /></svg>
                            </label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type={showPassword}
                                    placeholder="Password"
                                    id='pass'
                                    onChange={updatePass}
                                    onKeyDown={handleKeyDown}
                                    style={{ paddingRight: '40px' }}
                                />
                                <img
                                    className={styles.passwordToggle}
                                    src={eyes}
                                    alt="Toggle Password Visibility"
                                    onClick={displayPassword}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                        </div>

                        <button type="button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}


export default Login;