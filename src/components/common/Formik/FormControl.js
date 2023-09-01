import React from 'react'
import Input from './Input/Input'

const FormControl = ({ control, ...rest }) => {
    switch (control) {
        case "select":
            return "select"
        default:
            return <Input {...rest} />
    }
}

export default FormControl
