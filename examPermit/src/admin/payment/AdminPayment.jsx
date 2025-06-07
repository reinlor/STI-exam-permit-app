import React, { useState } from "react";
import paymentStyle from './adminPaymentStyle.module.css';

import Approved from './ApprovedPayment.jsx';
import Denied from './DeniedPayment.jsx';
import Pending from './PendingPayment.jsx';

function AdminPayment() {
    const [active, setActive] = useState('Pending');

    const displayModule = (module) => {
        switch (module) {
            case 'Approved':
                return <Approved />;
            case 'Denied':
                return <Denied />;
            case 'Pending':
                return <Pending />;
            default:
                return null;
        }
    };

    return (
        <div className={paymentStyle.container}>
            <h1 className={paymentStyle.title}>Payments</h1>
            <div className={paymentStyle.tabNavigation}>
                {['Pending', 'Denied', 'Approved'].map((tab) => (
                    <div
                        key={tab}
                        className={`${paymentStyle.tab} ${active === tab ? paymentStyle.activeTab : ''}`}
                        onClick={() => setActive(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className={paymentStyle.moduleContainer}>
                {displayModule(active)}
            </div>
        </div>
    );
}

export default AdminPayment;
