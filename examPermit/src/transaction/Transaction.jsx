import React,{useState, createContext, useEffect} from "react";
import axios from "axios";
import Navigation from "../components/navbar/Navigation";
import TransactionContent from "./TransactionContent";

export const TransactionContext = createContext()

function Transaction() {
    const [transactionData, setTransactionData] = useState([]);
    const uid = sessionStorage.getItem("uid");

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
        if(transactionData.length <= 0){
            return (
                <div>
                    <h1 className="text-center">No Transaction Found</h1> 
                </div>
            )
        }
        else{
            return <TransactionContext.Provider value={transactionData}>
                <TransactionContent/>
            </TransactionContext.Provider>
            
    }}

    return (
        <>
            <Navigation />
                {renderContent()}
        </>
    );
}

export default Transaction;