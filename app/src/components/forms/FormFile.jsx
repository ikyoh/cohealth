import React from 'react'
import { Field, ErrorMessage } from 'formik';

const FormFile = ({ label, name, placeholder, type = 'file', required = false, disabled = false, className = null }) => {

    return (
        <div className={`bg-gray-100 p-2 rounded ${className ? className : ''}`}>
            <div className="md:flex md:justify-between md:items-center text-sm input-group">
                <label htmlFor={name} className="">
                    {label}
                    {required && <span className='text-red-500'>*</span>}
                </label>
                <Field
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled} />
            </div>
            <ErrorMessage name={name} render={msg => <div className="error">({msg})</div>} />
        </div>

    )
}

export default FormFile