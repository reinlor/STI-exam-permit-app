import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import approvedStyle from './approvedPaymentStyle.module.css';

function ApprovedPayment() {
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
        if (e.target.className.includes(approvedStyle.modalOverlay)) {
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
                const response = await axios.get(`http://localhost:8000/api/payment/status/Approved`);
                setPaymentData(response.data);
                setFilteredPaymentData(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
                toast.error("Failed to fetch payment data. Please try again.");
            }
        };
        fetchData();
    }, []);

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
            <div className={approvedStyle.noDataMessage}>
                No Data Found
            </div>
        );
    }

    const displayPaymentData = currentPaymentData.map((element) => (
        <div
            className={approvedStyle.paymentData}
            key={element.transactionNumber}
            onClick={() => handlePaymentClick(element.transactionNumber)}
        >
            <div className={approvedStyle.basicData}>
                <h2>{element.transactionNumber}</h2>
                <h4>{element.uid}</h4>
                <p>Payment Mode: {element.paymentMode}</p>
            </div>
            <div className={approvedStyle.amountData}>
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
                className={`${approvedStyle.paginationButton} ${currentPage === i ? approvedStyle.activeButton : ""}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div>
            <input
                type="text"
                className={approvedStyle.searchBar}
                placeholder="Search by Transaction Number, UID, or Payment Mode"
                value={searchTerm}
                onChange={handleSearch}
            />
            {displayPaymentData}
            <div className={approvedStyle.paginationContainer}>
                {paginationButtons}
            </div>
            {show && (
                <div
                    className={`${approvedStyle.modalOverlay} ${show ? approvedStyle.fadeIn : ''}`}
                    onClick={handleOverlayClick}
                >
                    <div className={approvedStyle.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={approvedStyle.modalHeader}>
                            <h2>Payment Details</h2>
                            <button className={approvedStyle.closeButton} onClick={toggleModal}>
                                ✕
                            </button>
                        </div>
                        <div className={approvedStyle.feesValueContainer}>
                            <div>
                                <h2>Payment Proof</h2>
                                <img
                                    className={approvedStyle.imageProof}
                                    src={paymentDataByID?.photoUrl || '/ExamPermitStorage/PaymentProof/placeholder.png'}
                                    alt="Payment Proof"
                                />
                            </div>
                            <div className={approvedStyle.transactionData}>
                                <h1>{paymentDataByID?.transactionNumber}</h1>
                                <h4>{paymentDataByID?.uid}</h4>
                                <p><b>Amount:</b> ₱ {paymentDataByID?.feeAmount}</p>
                                <p><b>Payment Mode:</b> {paymentDataByID?.paymentMode}</p>
                                <p><b>Payment Period:</b> {paymentDataByID?.paymentPeriod}</p>
                                <p><b>Reference Number:</b> {paymentDataByID?.referenceNumber}</p>
                                <p><b>Date Submitted:</b> {paymentDataByID?.transactionDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApprovedPayment;