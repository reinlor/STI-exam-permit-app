import { Link } from 'react-router-dom';
import styles from './navbarStyle.module.css'
import stiLogo from '../../assets/images/STI-Logo.png'
import profilePlaceholder from '../../assets/images/placeholder.png'
import axios from 'axios';

function Navigation(){
    
    return(
        <>
        <div className={styles.navbar}>
            <div className={styles.navLeft}>
                <Link to="/homepage"><img className={styles.logo} src={stiLogo}></img></Link>
            </div>

            <ul className={styles.navMenu}>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/balance">Balance</Link></li>
                <li><Link to="/permit">Permit</Link></li>
                <li><Link to="/transaction">Transaction</Link></li>
                <li><Link to="/validation">Validation</Link></li>
            </ul>

            <div className={styles.navRight}>
                <Link to="/profile"><img className={styles.iconProfile} src={profilePlaceholder}></img></Link>
            </div>
        </div>
        </>
    );
}

export default Navigation;