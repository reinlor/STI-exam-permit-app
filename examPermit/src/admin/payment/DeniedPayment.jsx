import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import deniedStyle from './deniedPaymentStyle.module.css';

function DeniedPayment() {
    const [paymentData, setPaymentData] = useState([]); // List of payments
    const [filteredPaymentData, setFilteredPaymentData] = useState([]); // Filtered payments for search
    const [paymentID, setPaymentID] = useState(); // Selected payment ID
    const [show, setShow] = useState(false); // Modal visibility
    const [paymentDataByID, setPaymentDataByID] = useState(); // Selected payment details
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const itemsPerPage = 3; // Number of items per page
    const [searchTerm, setSearchTerm] = useState(""); // Search term

    // Handle click on a payment item
    const handlePaymentClick = (paymentID) => {
        setPaymentID(paymentID);
        getPaymentDataByID(paymentID);
        toggleModal();
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setShow(!show);
    };

    // Close modal when clicking outside of it
    const handleOverlayClick = (e) => {
        if (e.target.className.includes(deniedStyle.modalOverlay)) {
            toggleModal();
        }
    };

    // Fetch payment details by ID
    const getPaymentDataByID = async (paymentID) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/payment/transaction/${paymentID}`);
            console.log("API Response:", response.data); // Debugging
            setPaymentDataByID(response.data[0]);
        } catch (error) {
            console.log("Error while fetching data", error);
            toast.error("Failed to fetch payment details. Please try again.");
        }
    };

    // Fetch all rejected payments
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/payment/status/Rejected`);
                setPaymentData(response.data);
                setFilteredPaymentData(response.data); // Initialize filtered data
            } catch (error) {
                console.log("Error while fetching data", error);
                toast.error("Failed to fetch payment data. Please try again.");
            }
        };
        fetchData();
    }, []);

    // Handle search bar input
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filteredData = paymentData.filter((item) =>
            item.transactionNumber.toLowerCase().includes(term) ||
            item.uid.toLowerCase().includes(term) ||
            item.paymentMode.toLowerCase().includes(term)
        );
        setFilteredPaymentData(filteredData);
        setCurrentPage(1); // Reset to the first page after search
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPaymentData = filteredPaymentData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPaymentData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Display a message if no payment data is found
    if (paymentData.length <= 0) {
        return (
            <div className={deniedStyle.noDataMessage}>
                No Data Found
            </div>
        );
    }

    // Map over current payment data to display each payment
    const displayPaymentData = currentPaymentData.map((element) => (
        <div
            className={deniedStyle.paymentData}
            key={element.transactionNumber}
            onClick={() => handlePaymentClick(element.transactionNumber)}
        >
            <div className={deniedStyle.basicData}>
                <h2>{element.transactionNumber}</h2>
                <h4>{element.uid}</h4>
                <p>Payment Mode: {element.paymentMode}</p>
            </div>
            <div className={deniedStyle.amountData}>
                <p>{element.feeAmount}</p>
                <p>Payment Period: {element.paymentPeriod}</p>
            </div>
        </div>
    ));

    // Pagination buttons
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                className={`${deniedStyle.paginationButton} ${currentPage === i ? deniedStyle.activeButton : ""}`}
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
                className={deniedStyle.searchBar}
                placeholder="Search by Transaction Number, UID, or Payment Mode"
                value={searchTerm}
                onChange={handleSearch}
            />
            {displayPaymentData}
            <div className={deniedStyle.paginationContainer}>
                {paginationButtons}
            </div>
            {show && (
                <div
                    className={`${deniedStyle.modalOverlay} ${show ? deniedStyle.fadeIn : ''}`}
                    onClick={handleOverlayClick}
                >
                    <div className={deniedStyle.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={deniedStyle.modalHeader}>
                            <h2>Payment Details</h2>
                            <button className={deniedStyle.closeButton} onClick={toggleModal}>
                                ✕
                            </button>
                        </div>
                        <div className={deniedStyle.feesValueContainer}>
                            <div>
                                <h2>Payment Proof</h2>
                                <img
                                    className={deniedStyle.imageProof}
                                    src={paymentDataByID?.photoUrl || '/ExamPermitStorage/PaymentProof/placeholder.png'}
                                    alt="Payment Proof"
                                />
                            </div>
                            <div className={deniedStyle.transactionData}>
                                <h1>{paymentDataByID?.transactionNumber}</h1>
                                <h4>{paymentDataByID?.uid}</h4>
                                <p><b>Amount:</b> ₱ {paymentDataByID?.feeAmount}</p>
                                <p><b>Payment Mode:</b> {paymentDataByID?.paymentMode}</p>
                                <p><b>Payment Period:</b> {paymentDataByID?.paymentPeriod}</p>
                                <p><b>Reference Number:</b> {paymentDataByID?.referenceNumber}</p>
                                <p><b>Status: </b> {paymentDataByID?.status}</p>
                                <p><b>Date Submitted:</b> {paymentDataByID?.transactionDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeniedPayment;