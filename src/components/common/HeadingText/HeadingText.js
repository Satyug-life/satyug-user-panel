import React from 'react';
import styles from "./HeadingText.module.scss";
import { S3_BUCKET } from '../../../utils/Constants';

const HeadingText = ({ heading, className, dataAos }) => {
    return (
        <div {...dataAos} className={`${styles.heading_text} ${className || ""}`}>
            <span><img src={`${S3_BUCKET.IMAGES}/heading-left.png`} alt="" /></span>
            <h2>{heading}</h2>
            <span>
                <img src={`${S3_BUCKET.IMAGES}/heading-right.png`} alt="" />
            </span>
        </div>
    )
}

export default HeadingText
