import React from 'react'

const FormLabel = ({name, label, required=false}) => {
    return (
        <label htmlFor={name}
            className="text-primary justify-self-start self-center">
            {label}
            {required && <span className='text-red-500'> *</span>}
        </label>
    )
}

export default FormLabel