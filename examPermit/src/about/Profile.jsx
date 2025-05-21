import placeholder from '../assets/profile/placeholder.png'
import placeholderSound from '../assets/profile/sound.mp3'
import style from "./aboutStyle.module.css";

function Profile({ 
    profile = placeholder, 
    name = "Member",
    role = "Member", 
    sounds = placeholderSound
    }) {


    function profileSound() {
        const sound = new Audio(sounds);
        sound.play();
    }

    return (<>
        <div className={style.profile} onClick={profileSound}>
            <img className={style.profileImage} src={profile} alt="Profile Picture" />
            <h2 className>{name}</h2>
            <p className>{role}</p>
        </div>
    </>
    );
}

export default Profile;