import Navigation from "../components/navbar/Navigation";
import styles from "./balanceStyle.module.css";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import Charges from './Charges.jsx'
import PaymentAdjustment from "./PaymentAdjustment.jsx";

export const balanceContext = createContext();
// props sana kaso walang default props si React 19
function Balance() {
    const uid = sessionStorage.getItem("uid");
    const [programLevel, setProgramLevel] = useState('BSIT 1.X');
    const [studentData, setStudentData] = useState();
    const [balance, setBalance] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/students/${uid}`);
                setStudentData(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, [uid]);
    
    useEffect(() => {
        if (studentData) {
            adjustProgramLevel(); // Call adjustProgramLevel only after studentData is fetched
        }
    }, [studentData]);
    
    useEffect(() => {
        const fetchBalanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/balance/${programLevel}`);
                setBalance(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
    
        if (programLevel) {
            fetchBalanceData(); // Fetch balance only after programLevel is set
        }
    }, [programLevel]);
    
    const adjustProgramLevel = () => {
        if (studentData.program === 'BSIT' && studentData.yearLevel === "1st Year") {
            setProgramLevel('BSIT 1.X');
        } else if (studentData.program === 'BSIT' && studentData.yearLevel === "2nd Year") {
            setProgramLevel('BSIT 2.X');
        } else if (studentData.program === 'BSIT' && studentData.yearLevel === "3rd Year") {
            setProgramLevel('BSIT 3.X');
        } else if (studentData.program === 'BSIT' && studentData.yearLevel === "4th Year") {
            setProgramLevel('BSIT 4.X');
        }
    };


    return (
        <>
            <Navigation />
            <div className={styles.balanceContainer}>
                <div className={styles.balanceHeader}>
                    <h3>Tertiary</h3>
                    <h3>Total Balance: Php {balance?.tuitionFee || 0}</h3>
                </div>
                <div className={styles.balanceData}>
                    <balanceContext.Provider value={{ balance, studentData }}>
                        <div className={styles.balanceContent}>
                            <Charges />
                        </div>

                        <div className={styles.paymentContent}>
                            <PaymentAdjustment />
                        </div>
                    </balanceContext.Provider>
                </div>
            </div>
        </>
    );
}

export default Balance;