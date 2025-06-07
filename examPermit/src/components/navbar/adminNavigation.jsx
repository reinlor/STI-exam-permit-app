import React, { useState } from 'react';
import NavigationStyle from './adminNavigationStyle.module.css';

import AdminDashboard from '../../admin/dashboard/dashboard.jsx';
import Registrar from '../../admin/registrar/registrar.jsx';
import Tuition from '../../admin/tuition/Tuition.jsx';
import Users from '../../admin/user/Users.jsx';
import AdminPayment from '../../admin/payment/AdminPayment.jsx';

function adminNavigation() {
    const [active, setActive] = useState('Home');

    const displayModule = (module) => {
        switch (module) {
            case 'Home':
                return <AdminDashboard setActive={setActive}/>;
            case 'Registrar':
                return <Registrar />;
            case 'Tuition':
                return <Tuition />;
            case 'Users':
                return <Users />;
            case 'Payment':
                return <AdminPayment/>
            default:
        }
    }

    return (
        <div className={NavigationStyle.bodyContainer}>
            <div className={NavigationStyle.navbarContainer}>
                <div onClick={() => setActive('Home')}>
                    <i className="fa-solid fa-house" style={{marginRight: '8px'}}></i>Home
                </div>
                <div onClick={() => setActive('Registrar')}>
                    <i className="fa-regular fa-address-card" style={{ marginRight: '8px' }}></i>Registrar
                </div>
                <div onClick={() => setActive('Tuition')}>
                    <i className="fa-solid fa-graduation-cap" style={{ marginRight: '8px' }}></i>Tuition
                </div>
                <div onClick={() => setActive('Users')}>
                    <i className="fa-solid fa-users" style={{ marginRight: '8px' }}></i>Users
                </div>
                <div onClick={() => setActive('Payment')}>
                    <i className="fa-solid fa-money-bill-wave" style={{ marginRight: '8px' }}></i>Payment
                </div>
            </div>
            <div className={NavigationStyle.moduleContainer}>
                {displayModule(active)}
            </div>
        </div>
    )

}

export default adminNavigation;