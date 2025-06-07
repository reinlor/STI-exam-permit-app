import React, { useContext } from "react";
import styles from "./balanceStyle.module.css";

import { balanceContext } from "./Balance";

function PaymentAdjustment() {
    const { balance, studentData } = useContext(balanceContext);

    const newDiscount = (discount) => {
        const tuitionFee = balance?.tuitionFee || 0;
        return discount ? tuitionFee - (tuitionFee * (discount / 100)) : tuitionFee;
    };

    const formatToTwoDecimalPlaces = (number) => {
        return Number(number.toFixed(2));
    }


    const displayAssessmentBalance = () => {
        if (!(studentData?.payment === 'Full')) {
            return formatToTwoDecimalPlaces(
                (balance?.miscellaneousFee + (balance?.otherSchoolFee || 0) + (newDiscount(studentData?.discount?.discountFee))) / 4
            )
        }
        return formatToTwoDecimalPlaces(
            balance?.miscellaneousFee + (balance?.otherSchoolFee || 0) + (newDiscount(studentData?.discount?.discountFee))
        )
    }


function discount() {
    if (studentData?.discount?.hasDiscount) {
        return (
            <>
                {console.log(studentData.discount)}
                <tr className={styles.tuitionFeeContainer3}>
                    <td>{studentData.discount.period} | {studentData.discount.discountName}</td>
                </tr>
                <tr className={styles.otherFee2TXT}>
                    <td>Discount Percentage</td>
                    <td>{studentData.discount.discountFee}%</td>
                </tr>
                <tr>
                    <td className={styles.separator2} colSpan={3}></td>
                </tr>
                <tr className={styles.otherFee2TXT}>
                    <td>Total</td>
                    <td>Php {formatToTwoDecimalPlaces(newDiscount(studentData.discount.discountFee))}</td>
                </tr>
            </>
        );
    }
    return null;
}

return (
    <>
        <table>
            <tbody>
                <tr className={styles.headerTXT}>
                    <td>Payments and Adjustments for {balance?.schoolYear || "2025-2026"} {studentData?.semester || "N/A"} Tertiary</td>
                </tr>
                <tr>
                    <td className={styles.separator} colSpan={3}></td>
                </tr>

                {discount()}
                <tr className={styles.tuitionFeeContainer3}>
                    <td>{studentData?.discount.period} | OR #1183232</td>
                </tr>

                <tr className={styles.otherFee2TXT}>
                    <td>Miscellaneous Fees</td>
                    <td>Php {balance?.miscellaneousFee || 0}</td>
                </tr>
                <tr>
                    <td className={styles.separator2} colSpan={3}></td>
                </tr>
                <tr className={styles.otherFee2TXT}>
                    <td>Other School Fees</td>
                    <td>Php {balance?.otherSchoolFee || 0}</td>
                </tr>
                <tr>
                    <td className={styles.separator2} colSpan={3}></td>
                </tr>
                <tr className={styles.totalFeeTXT}>
                    <td>Total Balance</td>
                    <td>Php {formatToTwoDecimalPlaces(
                        balance?.miscellaneousFee + (balance?.otherSchoolFee || 0) + (newDiscount(studentData?.discount?.discountFee)))}</td>
                </tr>
                <tr className={styles.paymentTuitionFee}>
                    <td>Tuition Fee</td>
                    <td className={styles.finalAmount}>
                        Php {
                            formatToTwoDecimalPlaces(
                                (balance?.tuitionFee + balance?.otherSchoolFee + balance?.miscellaneousFee) || 0
                            )
                        }
                    </td>
                </tr>
                <tr className={styles.paymentAssessmentBalance}>
                    <td>Assessment Balance</td>
                    <td className={styles.assessmentAmount}>
                        Php {displayAssessmentBalance()}
                    </td>
                </tr>
            </tbody>
        </table>
    </>
)};

export default PaymentAdjustment;