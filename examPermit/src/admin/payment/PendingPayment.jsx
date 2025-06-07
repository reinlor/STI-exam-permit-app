import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import pendingStyle from './pendingPaymentStyle.module.css';

function PendingPayment() {
    const [paymentData, setPaymentData] = useState([]); 
    const [filteredPaymentData, setFilteredPaymentData] = useState([]); 
    const [paymentID, setPaymentID] = useState(); 
    const [show, setShow] = useState(false); 
    const [paymentDataByID, setPaymentDataByID] = useState(); 
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 3; 
    const [searchTerm, setSearchTerm] = useState(""); 

    
    const handlePaymentClick = (paymentID) => {
        setPaymentID(paymentID);
        getPaymentDataByID(paymentID);
        toggleModal();
    };

    
    const toggleModal = () => {
        setShow(!show);
    };

    
    const handleOverlayClick = (e) => {
        if (e.target.className.includes(pendingStyle.modalOverlay)) {
            toggleModal();
        }
    };

    
    const getPaymentDataByID = async (paymentID) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/payment/transaction/${paymentID}`);
            console.log("API Response:", response.data);
            setPaymentDataByID(response.data[0]);
        } catch (error) {
            console.log("Error while fetching data", error);
            toast.error("Failed to fetch payment details. Please try again.");
        }
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/payment/status/Pending`);
                setPaymentData(response.data);
                setFilteredPaymentData(response.data); 
            } catch (error) {
                console.log("Error while fetching data", error);
                toast.error("Failed to fetch payment data. Please try again.");
            }
        };
        fetchData();
    });

    
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filteredData = paymentData.filter((item) =>
            item.transactionNumber.toLowerCase().includes(term) ||
            item.uid.toLowerCase().includes(term) ||
            item.paymentMode.toLowerCase().includes(term)
        );
        setFilteredPaymentData(filteredData);
        setCurrentPage(1); 
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPaymentData = filteredPaymentData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPaymentData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
    if (paymentData.length <= 0) {
        return (
            <div className={pendingStyle.noDataMessage}>
                No Data Found
            </div>
        );
    }

    
    const displayPaymentData = currentPaymentData.map((element) => (
        <div
            className={pendingStyle.paymentData}
            key={element.transactionNumber}
            onClick={() => handlePaymentClick(element.transactionNumber)}
        >
            <div className={pendingStyle.basicData}>
                <h2>{element.transactionNumber}</h2>
                <h4>{element.uid}</h4>
                <p>Payment Mode: {element.paymentMode}</p>
            </div>
            <div className={pendingStyle.amountData}>
                <p>{element.feeAmount}</p>
                <p>Payment Period: {element.paymentPeriod}</p>
            </div>
        </div>
    ));

    
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                className={`${pendingStyle.paginationButton} ${currentPage === i ? pendingStyle.activeButton : ""}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        );
    }

    const updatePaymentStatus = async (transactionNumber, status) => {
        try {
            const newStatus = {
                status: status
            };
            await axios.put(`http://localhost:8000/api/payment/update/${transactionNumber}`, newStatus);
            toast.success("Payment Status updated successfully", { position: "top-right" });
        } catch (error) {
            toast.error("Error while updating Payment Status", { position: "top-right" });
        }
    }

    const updatePaymentTerm = async (studentId, status) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/students/${studentId}`);
            const term = response.data.paymentStatus;
            
            let newTerm = null;
            if (term === 'Prelims') {
                newTerm = 'Midterms';
            } else if (term === 'Midterms') {
                newTerm = 'Pre-Finals';
            } else if (term === 'Pre-Finals') {
                newTerm = 'Finals';
            } else if (term === 'Finals') {
                newTerm = 'Paid';
            }
    
            if (!newTerm) {
                toast.error("Unable to determine the next payment term.", { position: "top-right" });
                return;
            }
            
            const updatedTerm = {
                paymentStatus: newTerm,
                hasOngoingPayment: false,
            };
            
            if(status !== 'Rejected'){
                await axios.put(`http://localhost:8000/api/students/${studentId}`, updatedTerm);
            }

            else{
                await axios.put(`http://localhost:8000/api/students/${studentId}`, {
                    hasOngoingPayment: false
                });
            }
    
            toast.success("Student term updated!", { position: "top-right" });
        } catch (error) {
            console.error("Error while updating payment term:", error);
            toast.error("Error while updating Payment Status", { position: "top-right" });
        }
    };

    return (
        <div>
            <input
                type="text"
                className={pendingStyle.searchBar}
                placeholder="Search by Transaction Number, UID, or Payment Mode"
                value={searchTerm}
                onChange={handleSearch}
            />
            {displayPaymentData}
            <div className={pendingStyle.paginationContainer}>
                {paginationButtons}
            </div>
            {show && (
                <div
                    className={`${pendingStyle.modalOverlay} ${show ? pendingStyle.fadeIn : ''}`}
                    onClick={handleOverlayClick}
                >
                    <div className={pendingStyle.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={pendingStyle.modalHeader}>
                            <h2>Payment Details</h2>
                            <button className={pendingStyle.closeButton} onClick={toggleModal}>
                                ✕
                            </button>
                        </div>
                        <div className={pendingStyle.feesValueContainer}>
                            <div>
                                <h2>Payment Proof</h2>
                                <img
                                    className={pendingStyle.imageProof}
                                    src={paymentDataByID?.photoUrl || '/ExamPermitStorage/PaymentProof/placeholder.png'}
                                    alt="Payment Proof"
                                />
                            </div>
                            <div className={pendingStyle.transactionData}>
                                <h1>{paymentDataByID?.transactionNumber}</h1>
                                <h4>{paymentDataByID?.uid}</h4>
                                <p><b>Amount:</b> ₱ {paymentDataByID?.feeAmount}</p>
                                <p><b>Payment Mode:</b> {paymentDataByID?.paymentMode}</p>
                                <p><b>Payment Period:</b> {paymentDataByID?.paymentPeriod}</p>
                                <p><b>Reference Number:</b> {paymentDataByID?.referenceNumber}</p>
                                <p><b>Date Submitted:</b> {paymentDataByID?.transactionDate}</p>
                                <div className={pendingStyle.buttonContainer}>
                                    <button
                                        className={pendingStyle.transactionAprroveButtons}
                                        onClick={() => { 
                                            updatePaymentStatus(paymentDataByID?.transactionNumber, "Approved");
                                            updatePaymentTerm(paymentDataByID?.uid, "Approved"); 
                                            toggleModal(); }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={pendingStyle.transactionRejectButtons}
                                        onClick={() => { 
                                            updatePaymentStatus(paymentDataByID?.transactionNumber, "Rejected"); 
                                            updatePaymentTerm(paymentDataByID?.uid, "Rejected"); 
                                            toggleModal(); 
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PendingPayment;