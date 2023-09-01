import React, { forwardRef } from 'react';
import styles from "./Input.module.scss";
import { ErrorMessage, Field } from 'formik';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

const Input = forwardRef(({ name, error, label, className, ...rest }, ref) => {
    return (
        <div className={`${styles.input} ${className || ""}`}>
            {
                label &&
                <label htmlFor={name}>{label}</label>
            }
            <div className={styles.input_inner}>
                <Field
                    {...rest}
                    id={name}
                    name={name}
                    innerRef={ref}
                />
                <ErrorMessage name={name} component={ErrorMsg} />
            </div>
        </div>
    );
});

export default Input;
