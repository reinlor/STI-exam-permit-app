import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './navbarStyle.module.css'
import stiLogo from '../../assets/images/STI-Logo.png'
import profilePlaceholder from '../../assets/images/placeholder.png'
import busImg from "../../assets/profile/bus.png";
import axios from 'axios';

function Navigation(){
    const uid = localStorage.getItem("uid");
    const [preview, setPreview] = useState(busImg);

    useEffect(() => {
        const fetchStudentImage = async () => {
            if (!uid) return;

            try {
                const response = await axios.get(`http://localhost:8000/api/students/${uid}`);
                const profileUrl = response.data.profileUrl;

                if (profileUrl) {
                    setPreview(profileUrl);
                } else {
                    setPreview(busImg);
                }
            } catch (error) {
                console.error("Error fetching student image:", error);
                setPreview(busImg);
            }
        };
        fetchStudentImage();
    });
    
    return(
        <>
        <div className={styles.navbar}>
            <div className={styles.navLeft}>
                <Link to="/homepage"><img className={styles.logo} src={stiLogo}></img></Link>
            </div>

            <ul className={styles.navMenu}>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/balance">Balance</Link></li>
                <li><Link to="/permit">Permit</Link></li>
                <li><Link to="/transaction">Transaction</Link></li>
                <li><Link to="/validation">Validation</Link></li>
            </ul>

            <div className={styles.navRight}>
                <Link to="/profile"><img className={styles.iconProfile} src={preview}></img></Link>
            </div>
        </div>
        </>
    );
}

export default Navigation;