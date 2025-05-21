import Navigation from "../components/navbar/Navigation.jsx";
import styles from "./aboutStyle.module.css";
import Profile from "./Profile.jsx";

// picture
import dionneProfile from '../assets/profile/dionne.jpg'
import rehneilProfile from '../assets/profile/rehneil.jpg'
import jordanProfile from '../assets/profile/jordan.jpg'
import seanProfile from '../assets/profile/sean.jpg'

function About() {
    return (
        <>
            <Navigation />
            <div className={styles.aboutContainer}>
                <h1>Developers</h1>

                <div className={styles.profileContainer}>
                    <Profile
                        profile={dionneProfile}
                        name="De Pedro, Dionne"
                        role="UI/UX Designer"
                    />
                    <Profile
                        profile={rehneilProfile}
                        name="Lor, Rehneil"
                        role="Full-Stack Developer"
                    />
                    <Profile
                        profile={jordanProfile}
                        name="Colinco, Jordan"
                        role="Frontend Developer"
                    />
                    <Profile
                        profile={seanProfile}
                        name="Tugna, Sean"
                        role="Frontend Developer"
                    />
                </div>
                <p><b>
                    This website is developed to improve the transaction process of the....</b>
                </p><br />
                <p>Powered By &copy; 2025, STI College Dasmarinas</p>
            </div>
        </>
    );
}

export default About;