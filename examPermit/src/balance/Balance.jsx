import Navigation from "../components/navbar/Navigation";
import styles from "./balanceStyle.module.css";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import Charges from './Charges.jsx'
import PaymentAdjustment from "./PaymentAdjustment.jsx";

export const balanceContext = createContext();

function Balance() {
    const uid = localStorage.getItem("uid");
    const [programLevel, setProgramLevel] = useState('BSIT 1.1');
    const [studentData, setStudentData] = useState();
    const [balance, setBalance] = useState();
    const newDiscount = (discount) => {
        const tuitionFee = balance?.tuitionFee || 0;
        return discount ? tuitionFee - (tuitionFee * (discount / 100)) : tuitionFee;
    };

    const userAccess = localStorage.getItem('role');
    if (userAccess !== 'Student') {
        window.location.href = '/';
    }

    const getProgramLevel = (yearLevel, semester) => {
        if (yearLevel === '1st Year' && semester === '1st Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 1.1');
        }
        else if (yearLevel === '1st Year' && semester === '2nd Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 1.2');
        }
        else if (yearLevel === '2nd Year' && semester === '1st Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 2.1');
        }
        else if (yearLevel === '2nd Year' && semester === '2nd Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 2.2');
        }
        else if (yearLevel === '3rd Year' && semester === '1st Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 3.1');
        }
        else if (yearLevel === '3rd Year' && semester === '2nd Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 3.2');
        }
        else if (yearLevel === '4th Year' && semester === '1st Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 4.1');
        }
        else if (yearLevel === '4th Year' && semester === '2nd Sem' && studentData.program === 'BSIT') {
            setProgramLevel(pl => pl = 'BSIT 4.2');
        }
    }

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
            getProgramLevel(studentData.yearLevel, studentData.semester);
        }
    }, [studentData]);
    
    useEffect(() => {
        const fetchBalanceData = async () => {
            if (programLevel) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/balance/${programLevel}`);
                    setBalance(response.data);
                } catch (error) {
                    console.log("Error while fetching balance data", error);
                }
            }
        };
        fetchBalanceData();
    }, [programLevel]);

    const formatToTwoDecimalPlaces = (number) =>{
            return Number(number.toFixed(2));
        }
    
        function discount() {
            if (studentData?.discount?.hasDiscount) {
                return (
                    <>
                    {console.log(studentData.discount)}
                        <tr className={styles.tuitionFeeContainer3}>
                            <td>{studentData.discount.period} | {studentData.discount.discountName}</td>
                        </tr>
                        <tr className={styles.otherFee2TXT}>
                            <td>Discount Percentage</td>
                            <td>{studentData.discount.discountFee}%</td>
                        </tr>
                        <tr>
                            <td className={styles.separator2} colSpan={3}></td>
                        </tr>
                        <tr className={styles.otherFee2TXT}>
                            <td>Total</td>
                            <td>Php {formatToTwoDecimalPlaces(newDiscount(studentData.discount.discountFee))}</td>
                        </tr>
                    </>
                );
            }
            return null;
        }

    return (
        <>
            <Navigation />
            <div className={styles.balanceContainer}>
                <div className={styles.balanceHeader}>
                    <h3>Tertiary</h3>
                    <h3>Total Balance: Php {formatToTwoDecimalPlaces(
                                    balance?.miscellaneousFee + (balance?.otherSchoolFee || 0) + (newDiscount(studentData?.discount?.discountFee))) || 0}</h3>
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