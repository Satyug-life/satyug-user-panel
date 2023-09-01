import React from 'react'
import CustomPhoneInput from "react-phone-number-input";
import styles from "./PhoneInput.module.scss";
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { ErrorMessage } from 'formik';

const PhoneInput = ({ name, defaultCountry, label, className,formik, ...rest }) => {
    return (
        <div className={`${styles.input} ${className || ""}`}>
            {
                label &&
                <label>{label}</label>
            }
            <div className={styles.PhoneInput}>
                <CustomPhoneInput
                    {...rest}
                    addInternationalOption={false}
                    defaultCountry={defaultCountry}
                    name={name}
                />
                {/* <ErrorMessage name={name} component={ErrorMsg} /> */}
                <ErrorMsg>
                {formik.errors[name]}
                    </ErrorMsg>
            </div>
        </div>
    )
}

export default PhoneInput