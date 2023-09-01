import React from 'react'
import styles from "./PageHeading.module.scss";

const PageHeading = ({ className, heading }) => {
    return (
        <div className={`${styles.page_heading} ${className || ""}`}>
            <h2 data-aos="fade-up" data-aos-duration="500">{heading}</h2>
        </div>
    )
}

export default PageHeading
