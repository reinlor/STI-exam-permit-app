import react, { useEffect } from 'react';
import AdminTopBar from '../components/navbar/adminTopBar.jsx'
import AdminNavigation from '../components/navbar/adminNavigation.jsx';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();
    useEffect(() => {
        const userAccess = localStorage.getItem('role');
        if (userAccess !== 'Admin') {
            navigate('/');
        };
    }, [navigate]);

    return (
        <div className='adminContainer'>
            <AdminTopBar/>
            <AdminNavigation />
        </div>
    )
}

export default Admin;