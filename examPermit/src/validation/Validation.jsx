import Navigation from "../components/navbar/Navigation";
import styles from "./validationStyle.module.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import NotPaid from './NotPaid.jsx';
import Paid from './Paid.jsx';

function Validation() {
    const [studentData, setStudentData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('Not Paid');
    const [balance, setBalance] = useState(null);
    const [programLevel, setProgramLevel] = useState(null);
    const uid = localStorage.getItem('uid');

    const getProgramLevel = (yearLevel, semester, program) => {
        const map = {
            "1st Year": { "1st Sem": "1.1", "2nd Sem": "1.2" },
            "2nd Year": { "1st Sem": "2.1", "2nd Sem": "2.2" },
            "3rd Year": { "1st Sem": "3.1", "2nd Sem": "3.2" },
            "4th Year": { "1st Sem": "4.1", "2nd Sem": "4.2" },
        };

        if (program === 'BSIT' && map[yearLevel]?.[semester]) {
            setProgramLevel(`BSIT ${map[yearLevel][semester]}`);
        }
    };

    const formatToTwoDecimalPlaces = (number) => {
        return Number(number?.toFixed(2));
    };

    const newDiscount = (discount) => {
        const tuitionFee = balance?.tuitionFee || 0;
        return discount ? tuitionFee - (tuitionFee * (discount / 100)) : tuitionFee;
    };

    useEffect(() => {
        if (!uid) return;

        const fetchStudentData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/students/${uid}`);
                setStudentData(data);
                setPaymentStatus(data?.hasOngoingPayment ? 'Ongoing Payment' : 'Not Paid');
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    });

    useEffect(() => {
        if (studentData) {
            getProgramLevel(studentData.yearLevel, studentData.semester, studentData.program);
        }
    }, [studentData]);

    useEffect(() => {
        if (!programLevel) return;

        const fetchBalanceData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/balance/${programLevel}`);
                setBalance(data);
            } catch (error) {
                console.error("Error fetching balance data:", error);
            }
        };

        fetchBalanceData();
    }, [programLevel]);

    const displayTransaction = () => {
        if (!studentData || !balance) return null;

        if (studentData.paymentStatus !== 'Paid') {
            const totalBalance = formatToTwoDecimalPlaces(
                (balance.miscellaneousFee +
                (balance.otherSchoolFee || 0) +
                newDiscount(studentData?.discount?.discountFee)) / 4
            );

            return (
                <NotPaid
                    sid={studentData.uid}
                    name={studentData.name}
                    currentPeriod={studentData.paymentStatus}
                    course={studentData.program}
                    yearLevel={studentData.yearLevel}
                    email={studentData.studentEmail}
                    status={paymentStatus}
                    number={studentData.contactNumber}
                    balance={totalBalance}
                    hasOngoingPayment={studentData.hasOngoingPayment}
                />
            );
        }

        return <Paid />;
    };

    return (
        <>
            <Navigation />
            <div className={styles.validationContainer}>
                <div className={styles.validationHeader}>
                    <h2>Validation Form</h2>
                </div>
                {displayTransaction()}
            </div>
        </>
    );
}

export default Validation;
