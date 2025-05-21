import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import styles from './loginStyle.module.css';
import toast from 'react-hot-toast';


function Login() {
    const navigate = useNavigate();
    const [_id, setSid] = useState(' ');
    const [password, setPass] = useState('');
    sessionStorage.setItem('uid', _id);

        const handleLogin = async()=>{
            
                if(_id === '' || password ===''){
                    toast.error("Please fill in all required fields.", {position: "top-right"});
                    return;
                }
                try {
                    const response = await axios.post(`http://localhost:8000/api/login`,{
                        _id,
                        password
                    });
                    
                    if (response.data.success) {
                        toast.success("Login Succesful!", {position: "top-right"});
                        {navigate("/homepage")};
                    }
                    else{
                        
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


    return (
        <>
            <div className={styles.loginBody}>
                <div className={styles.loginContainer}>
                    <img className={styles.stiLogo} alt='STI Logo'></img>
                    <h1>Welcome!</h1>
                    <p>Login to STI Tracflow</p>
                    <form>
                        <input
                            type="text"
                            placeholder="Student Number"
                            id='sid'
                            onChange={updateSid} />
                        <br />

                        <input
                            type="password"
                            placeholder="Password"
                            id='pass'
                            onChange={updatePass} />
                        <br />

                        <button type="button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}


export default Login;