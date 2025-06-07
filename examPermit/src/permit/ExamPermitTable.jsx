import styles from "./permitStyle.module.css";
import React, { useContext, useState, useEffect } from "react";
import { permitContext } from "./Permit";
import axios from "axios";

function ExamPermitTable() {
    const uid = localStorage.getItem("uid");
    const [paidStatus, setPaidStatus] = useState('Prelims');

    const permit = useContext(permitContext)
    console.log(paidStatus);
    const courseDisplay = Array.isArray(permit.course) ? permit.course.map((element, index) => (
        <tr key={index}>
            <td>{element}</td>
            <td>{permit.section}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )) : null;

    useEffect(() => {
        setPaidStatus(permit.paymentTermStatus);
    })

    const paidColorIndication = (term) => {
        if (paidStatus === 'Midterms' && term === 'Prelims') {
            return styles.greenIndicator
        }
        else if (
            (paidStatus === 'Pre-Finals' && term === 'Prelims') ||
            (paidStatus === 'Pre-Finals' && term === 'Midterms')) {
            return styles.greenIndicator
        }
        else if (
            (paidStatus === 'Finals' && term === 'Prelims') ||
            (paidStatus === 'Finals' && term === 'Midterms') ||
            (paidStatus === 'Finals' && term === 'Pre-Finals')) {
            return styles.greenIndicator
        }
        else if (paidStatus === 'Paid') {
            return styles.greenIndicator;
        }
        return styles.redIndicator;
    }

    return (
        <>
            {/* Exam Approval Table - A.K.A Table 1 gar */}
            <table className={styles.examTable}>
                <thead>
                    <tr>
                        <th className={styles.emptyCell}></th>
                        <th className={styles.prelims}>PRELIMS</th>
                        <th className={styles.midterms}>MIDTERMS</th>
                        <th className={styles.prefinals}>PREFINALS</th>
                        <th className={styles.finals}>FINALS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.validationHeader}>VALIDATION OF ACCOUNT</td>
                        <td className={paidColorIndication('Prelims')}></td>
                        <td className={paidColorIndication('Midterms')}></td>
                        <td className={paidColorIndication('Pre-Finals')}></td>
                        <td className={paidColorIndication('Finals')}></td>
                    </tr>
                    <tr>
                        <td className={styles.validationHeader}>PROMISSORY NOTE APPROVAL</td>
                        <td className={paidColorIndication('Prelims')}></td>
                        <td className={paidColorIndication('Midterms')}></td>
                        <td className={paidColorIndication('Pre-Finals')}></td>
                        <td className={paidColorIndication('Finals')}></td>
                    </tr>
                </tbody>
            </table>

            {/* Course List Table - A.K.A Table 2 gar*/}
            <table className={styles.courseTable}>
                <thead>
                    <tr>
                        <th>COURSE TITLE</th>
                        <th>SECTION</th>
                        <th colSpan={4}>PROCTOR'S SIGNATURE | DATE</th>
                    </tr>
                </thead>
                <tbody>{courseDisplay}</tbody>
            </table>
        </>
    );
}

export default ExamPermitTable