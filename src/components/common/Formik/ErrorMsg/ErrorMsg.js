import React from 'react';
import styles from "./Errormsg.module.scss";

const ErrorMsg = ({ children }) => {
    return (
        <p className={styles.error_msg}>{children}</p>
    )
}

export default ErrorMsg
