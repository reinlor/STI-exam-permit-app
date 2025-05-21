import React, {useContext} from "react";
import styles from "./transactionStyle.module.css";

import { TransactionContext } from "./Transaction";
function TransactionContent() {

    const transaction = useContext(TransactionContext);
    
    const displayTransactionContent = transaction.map((element, index) =>{
        const formattedDate = new Date(element.transactionDate).toISOString().split('T')[0];
        return <tr key={index}>
            <td>{element.transactionNumber}</td>
            <td>{formattedDate}</td>
            <td>{element.payment}</td>
            <td>{element.paymentMode}</td>
            <td>{element.paymentPeriod}</td>
            <td>{element.referenceNumber}</td>
        </tr>
    });

    return (
        <div className={styles.transactionContainer}>
            <div>
                <h1>Transaction History</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Transaction Number</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Payment Mode</th>
                        <th>Payment Period</th>
                        <th>Reference Number</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTransactionContent}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionContent