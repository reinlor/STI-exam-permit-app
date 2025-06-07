import React, { useContext, useState } from "react";
import styles from "./transactionStyle.module.css";
import axios from "axios";
import toast from "react-hot-toast";

import { TransactionContext } from "./Transaction";

function TransactionContent() {
    const transaction = useContext(TransactionContext);
    const [show, setShow] = useState(false);
    const [transactionID, setTransactionID] = useState();
    const [paymentDataByID, setPaymentDataByID] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transaction.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalPages = Math.ceil(transaction.length / transactionsPerPage);

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                className={`${styles.paginationButton} ${currentPage === i ? styles.activeButton : ""}`}
                onClick={() => setCurrentPage(i)}
            >
                {i}
            </button>
        );
    }

    const displayTransactionContent = currentTransactions.map((element, index) => {
        const formattedDate = new Date(element.transactionDate).toISOString().split('T')[0];
        return (
            <tr key={index} onClick={() => handleTransactionClick(element.transactionNumber)}>
                <td>{element.transactionNumber}</td>
                <td>{formattedDate}</td>
                <td>{element.feeAmount}</td>
                <td>{element.paymentMode}</td>
                <td>{element.paymentPeriod}</td>
                <td>{element.referenceNumber}</td>
            </tr>
        );
    });

    const handleTransactionClick = (transactionId) => {
        setTransactionID(transactionId);
        getTransactionDataByID(transactionId);
        toggleModal();
    };

    const getTransactionDataByID = async (paymentID) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/payment/transaction/${paymentID}`);
            setPaymentDataByID(response.data[0]);
        } catch (error) {
            console.log("Error while fetching data", error);
            toast.error("Failed to fetch payment details. Please try again.");
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.className.includes(styles.modalOverlay)) {
            toggleModal();
        }
    };

    const toggleModal = () => {
        setShow(!show);
    };

    return (
        <div className={styles.transactionContainer}>
            <div className={styles.transactionHeader}>
                <h1>Transaction History</h1>
            </div>
            <table className={styles.transactionTable}>
                <thead>
                    <tr>
                        <th>Transaction Number</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Payment Period</th>
                        <th>Reference Number</th>
                    </tr>
                </thead>
                <tbody>{displayTransactionContent}</tbody>
            </table>

            {/* Pagination */}
            <div className={styles.paginationContainer}>{paginationButtons}</div>

            {show && (
                <div
                    className={`${styles.modalOverlay} ${show ? styles.fadeIn : ""}`}
                    onClick={handleOverlayClick}
                >
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Payment Details</h2>
                            <button className={styles.closeButton} onClick={toggleModal}>
                                ✕
                            </button>
                        </div>
                        <div className={styles.feesValueContainer}>
                            <div>
                                <h2>Payment Proof</h2>
                                <img
                                    className={styles.imageProof}
                                    src={paymentDataByID?.photoUrl || "/ExamPermitStorage/PaymentProof/placeholder.png"}
                                    alt="Payment Proof"
                                />
                            </div>
                            <div className={styles.transactionData}>
                                <h1>{paymentDataByID?.transactionNumber}</h1>
                                <h4>{paymentDataByID?.uid}</h4>
                                <p>
                                    <b>Amount:</b> ₱ {paymentDataByID?.feeAmount}
                                </p>
                                <p>
                                    <b>Payment Mode:</b> {paymentDataByID?.paymentMode}
                                </p>
                                <p>
                                    <b>Payment Period:</b> {paymentDataByID?.paymentPeriod}
                                </p>
                                <p>
                                    <b>Reference Number:</b> {paymentDataByID?.referenceNumber}
                                </p>
                                <p>
                                    <b>Status:</b> {paymentDataByID?.status}
                                </p>
                                <p>
                                    <b>Date Submitted:</b> {paymentDataByID?.transactionDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TransactionContent;