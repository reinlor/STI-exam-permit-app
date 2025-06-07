import React, { useState, useEffect } from "react";
import axios from "axios";
import tuitionStyle from "./tuitionStyle.module.css";
import toast from "react-hot-toast";

function Tuition() {
    const [tuition, setTuitionData] = useState([]);
    const [show, setShow] = useState(false);
    const [tuitionID, setTuitionID] = useState("");
    const [tuitionDataByID, setTuitionDataByID] = useState({});
    const [tuitionFee, setTuitionFee] = useState(tuitionDataByID.tuitionFee);
    const [otherSchoolFee, setOtherSchoolFee] = useState(tuitionDataByID.otherSchoolFee);
    const [miscellaneousFee, setMiscellaneousFee] = useState(tuitionDataByID.miscellaneousFee);
    const [currentPage, setCurrentPage] = useState(1);
    const [clickCount, newClickCount] = useState(0)
    const itemsPerPage = 4;

    function handleTuitionFeeChange(event) { setTuitionFee(event.target.value); }
    function handleOtherSchoolFeeChange(event) { setOtherSchoolFee(event.target.value); }
    function handleMiscellaneousFeeChange(event) { setMiscellaneousFee(event.target.value); }

    const handleTuitionClick = (tuition) => {
        setTuitionID(tuition);
        getTuitionDataByID(tuition);
        console.log(tuition);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className.includes(tuitionStyle.modalOverlay)) {
            toggleModal();
        }
    };

    useEffect(() => {
        setTuitionFee(tuitionDataByID.tuitionFee || '');
        setOtherSchoolFee(tuitionDataByID.otherSchoolFee || '');
        setMiscellaneousFee(tuitionDataByID.miscellaneousFee || '');
    }, [tuitionDataByID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/balance`);
                setTuitionData(response.data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, [clickCount]);

    const formatToTwoDecimalPlaces = (number) => {
        if (isNaN(number) || number === null || number === undefined) {
            toast.error("Insert a valid format", { position: "top-right" });
            throw new Error("Insert a valid format")
        }
        return Number(parseFloat(number).toFixed(2));
    };
    const updateTuitionFee = async (tuition) => {
        try {
            const newFees = {
                tuitionFee: formatToTwoDecimalPlaces(tuitionFee),
                otherSchoolFee: formatToTwoDecimalPlaces(otherSchoolFee),
                miscellaneousFee: formatToTwoDecimalPlaces(miscellaneousFee),
            };
            await axios.put(`http://localhost:8000/api/update/balance/${tuition}`, newFees);
            toast.success("Tuition Fees updated successfully", { position: "top-right" });
            newClickCount(cc => cc + 1);
        } catch (error) {
            toast.error("Error while updating tuition fees", { position: "top-right" });
        }
    };

    const toggleModal = () => {
        setShow(!show);
    };

    const getTuitionDataByID = async (tuitionID) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/balance/${tuitionID}`);
            setTuitionDataByID(response.data);
        } catch (error) {
            console.log("Error while fetching data", error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTuitionData = tuition.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tuition.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                className={`${tuitionStyle.paginationButton} ${currentPage === i ? tuitionStyle.activeButton : ""}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </button>
        );
    }

    const displayTuitionData = currentTuitionData.map((element, index) => {
        return (
            <div
                className={tuitionStyle.tuitionFeeContainer}
                key={element.cid}
                onClick={() => { handleTuitionClick(element.cid); toggleModal(); }}
            >
                <h2>{element.cid}</h2>
                <p>Tuition Fee: {element.tuitionFee}</p>
                <p>Other School Fee: {element.otherSchoolFee}</p>
                <p>Miscellaneous Fee: {element.miscellaneousFee}</p>
            </div>
        );
    });

    return (
        <div className={tuitionStyle.tuitionContainer}>
             <div className={tuitionStyle.headingBox}>
                <h1>Tuition Fee</h1>
            </div>
            {displayTuitionData}

            <div className={tuitionStyle.paginationContainer}>
                {paginationButtons}
            </div>

            {show && (
                <div
                    className={`${tuitionStyle.modalOverlay} ${show ? tuitionStyle.fadeIn : ''}`}
                    onClick={handleOverlayClick}
                >
                    <div className={tuitionStyle.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={tuitionStyle.modalHeader}>
                            <h2>Change Value</h2>
                            <button className={tuitionStyle.closeButton} onClick={toggleModal}>
                                ✕
                            </button>
                        </div>
                        <div className={tuitionStyle.feesValueContainer}>
                            <h2>{tuitionDataByID.cid}</h2>
                            <label>Tuition Fee:
                                <input type="text" value={tuitionFee || ''} onChange={handleTuitionFeeChange} />
                            </label>
                            <label>Other School Fee:
                                <input type="text" value={otherSchoolFee || ''} onChange={handleOtherSchoolFeeChange} />
                            </label>
                            <label>Miscellaneous Fee:
                                <input type="text" value={miscellaneousFee || ''} onChange={handleMiscellaneousFeeChange} />
                            </label>
                            <button onClick={() => { updateTuitionFee(tuitionID); toggleModal(); }}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tuition;