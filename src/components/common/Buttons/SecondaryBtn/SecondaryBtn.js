import React from 'react';
import styles from "./SecondaryBtn.module.scss";
import { S3_BUCKET } from '../../../../utils/Constants';
import { Spinner } from 'react-bootstrap';
const SecondaryBtn = ({ className,loading, disabled, onClick, type, text, ...rest }) => {
    return (
        <button
            {...rest}
            disabled={loading | disabled}
            data-aos="zoom-in"
            data-aos-offset="-400"
            onClick={onClick}
            type={type || "button"}
            className={`${styles.button} ${className || ""}`}
        >
            {
                loading ?
                <Spinner/>
                :
                <>
                <img src={`${S3_BUCKET.IMAGES}/left-arrow.png`} alt='left-arrow' />
            <span data-aos-offset="-400" data-aos="zoom-in" >{text}</span>
            <img src={`${S3_BUCKET.IMAGES}/right-arrow.png`} alt='right-arrow' />
                </>
            }
        </button>
    )
}

export default SecondaryBtn
