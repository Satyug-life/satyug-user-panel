import React from 'react';
import styles from "./Button.module.scss";
import { Spinner } from 'react-bootstrap';

const Button = ({ className, loading, noAos, variant, children, text, ...rest }) => {
    const aos = noAos ? {} : {
        "data-aos": "zoom-in",
        "data-aos-offset": "-400",
    };
    const variants = variant ? {
        "data-variant": variant,
    } : {}
    return (
        <button
            {...rest}
            className={`${styles.button} ${className || ""}`}
            // data-aos={noAos ? "" : "zoom-in"}
            // data-aos-offset="-400"
            {...aos}
            {...variants}
        >
            {loading ? <Spinner /> : children || text}
        </button>
    )
}

export default Button
