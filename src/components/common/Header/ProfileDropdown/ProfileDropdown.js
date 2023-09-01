import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from "./ProfileDropdown.module.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { S3_BUCKET } from '../../../../utils/Constants';

const ProfileDropdown = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const name = useSelector((state) => state.userDetails.name)
    // const image = useSelector((state) => state.userDetails.image)
    const { isProduct } = location?.state || {};


    const handleLogout = () => {
        if (isProduct === true) {
            navigate('/product')
        } else {
            navigate('/collectibles')
        }
    }

    return (
        <>
            <Dropdown className={styles.profile}>
                <Dropdown.Toggle className={styles.profile_box} id="profile-dropdown">
                    {/* <img src={image || `${S3_BUCKET.IMAGES}/profile.svg`} alt="" /> */}
                    <h3>{name || "--"}</h3>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.profile_dropdown}>
                    <Link to="#" onClick={handleLogout}>Logout</Link>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ProfileDropdown
