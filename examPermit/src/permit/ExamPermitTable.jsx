import styles from "./permitStyle.module.css";
import React, { useContext } from "react";
import { permitContext } from "./Permit";

function ExamPermitTable() {

    const permit = useContext(permitContext)
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


    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">Prelims</th>
                        <th scope="col">Midterms</th>
                        <th scope="col">Prefinals</th>
                        <th scope="col">Finals</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>VALIDATION OF ACCOUNT</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>PROMISSORY NOTE APPROVAL</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope="col">COURSE TITLE</th>
                        <th scope="col">SECTION</th>
                        <th scope="col">PROCTOR'S SIGNATURE | DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {courseDisplay}
                </tbody>
            </table>
        </>
    );
}

export default ExamPermitTable