import Navigation from "../components/navbar/Navigation";
import styles from "./validationStyle.module.css";
import react, { useState } from 'react'
import NotPaid from './NotPaid.jsx' 
import Paid from './Paid.jsx' 

function Validation({
    sid = '0200000000',
    name = 'Student',
    currentPeriod = 'Prelims',
    course = 'BSxx',
    yearLevel = '1st Year',
    email = 'student@gmail.com',
    status = 'Not Paid',
    number = "090000000",
    balance = 0.00
}) {

    function displayTransaction() {
        if (!(status === 'Paid')) {
            return <NotPaid
                sid={sid}
                name={name}
                currentPeriod={currentPeriod}
                course={course}
                yearLevel={yearLevel}
                email={email}
                status={status}
                number={number}
                balance={balance}
            />
        }
        return (
            <Paid/>
        )
    }

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