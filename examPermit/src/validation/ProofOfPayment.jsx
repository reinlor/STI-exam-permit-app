import styles from "./validationStyle.module.css";
import placeholderBg from "../assets/images/placeholderBg.jpg"

function ProofOfPayment(){
    return(
        <div className={styles.paymentUploadContainer}>
                <div className={styles.uploadHeader}>
                    <h3>Upload Proof of Payment</h3>
                    <div className={styles.separator}></div>
                </div>

                <input type="filepath" readOnly className={styles.filePath}/>

                <div className={styles.uploadContents}>

                    <img src={placeholderBg} alt="Placeholder" className={styles.placeholderBg} />

                    <div className={styles.buttonContainer}>
                        <button className={styles.uploadButton}>Upload</button>
                        <button className={styles.submitButton}>Submit</button>
                    </div>
                </div>
            </div>
    )
};

export default ProofOfPayment