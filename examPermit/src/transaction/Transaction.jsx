import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/navbar/Navigation";
import TransactionContent from "./TransactionContent";
import styles from "./transactionStyle.module.css";

export const TransactionContext = createContext()

function Transaction() {
    const [transactionData, setTransactionData] = useState([]);
    const uid = localStorage.getItem("uid");

    const userAccess = localStorage.getItem('role');
    if (userAccess !== 'Student') {
        window.location.href = '/';
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/payment/${uid}`);
                setTransactionData(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData();
    }, [])



    const renderContent = () => {
        if (transactionData.length <= 0) {
            return (
                <div className={styles.noTransactionMessage}>
                    <h1 className="text-center">No Transaction Found</h1>
                </div>
            )
        }
        else {
            return <TransactionContext.Provider value={transactionData}>
                <TransactionContent />
            </TransactionContext.Provider>

        }
    }

    return (
        <div >
            <Navigation />
            {renderContent()}
        </div>
    );
}

export default Transaction;