import styles from './dashboardStyle.module.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard({ setActive }) {
    const [balance, setBalance] = useState([]);
    const [user, setUser] = useState([]);
    const [confirmation, setConfirmation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/balance`);
                setBalance(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/students`);
                setUser(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/payment/status/Pending`);
                setConfirmation(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData();
    }, [])

    const displayBalanceContext = balance.map((element, index) => {
        return (
            <tr key={index} onClick={() => handleTransactionClick(element.transactionNumber)}>
                <td>{element.cid}</td>
                <td>{element.tuitionFee}</td>
                <td>{element.otherSchoolFee}</td>
                <td>{element.miscellaneousFee}</td>
            </tr>
        );
    });

    const changeModule = (moduleName) => {
        if(moduleName === 'Payment'){
            
        }
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.counterDisplay}>
                <div onClick={() => setActive('Payment')}>
                    <h1>Pending Confirmation</h1>
                    <p>{confirmation.length}</p>
                </div>
                <div onClick={() => setActive('Users')}>
                    <h1>Number of Users</h1>
                    <p>{user.length}</p>
                </div>
            </div>
            <div className={styles.transactionTableContainer}>
                <h1>Cost of fees</h1>
                <table 
                    className={styles.transactionTable}
                    onClick={() => setActive('Tuition')}>
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Tuition Fee</th>
                            <th>Otherschool Fee</th>
                            <th>Miscellaneous Fee</th>
                        </tr>
                    </thead>
                    <tbody>{displayBalanceContext}</tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;