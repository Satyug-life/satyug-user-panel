import React, { useEffect } from 'react'
import styles from "./Loader.module.scss";
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    // useEffect(() => {
    //     document.body.style.overflow = "hidden";
    // }, [])
    return (
        <div className={styles.loader}>
            <Spinner />
        </div>
    )
}

export default Loader
