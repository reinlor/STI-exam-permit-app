import topBarStyle from './adminTopBarStyle.module.css'
import { useNavigate } from 'react-router-dom';

function adminTopBar(){
    const navigate = useNavigate();
    
    return(
        <div className={topBarStyle.topBarContainer}>
            <p className={topBarStyle.title}>STI Tracflow</p>
            <button className={topBarStyle.logoutButton} onClick={
                () => {
                    localStorage.removeItem('role');
                    localStorage.removeItem('uid');
                    navigate('/');
                }
                }>
                Logout
            </button>
        </div>
    )
}

export default adminTopBar;