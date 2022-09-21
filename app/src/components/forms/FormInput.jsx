import React from 'react'
import { Field, ErrorMessage } from 'formik';

const FormInput = ({ label, name, placeholder, type = 'text', required = false, disabled = false, className = null }) => {

    return (
        <div className={`bg-gray-100 p-2 rounded ${className ? className : ''}`}>
            <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0 md:items-center text-sm input-group">
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
            <ErrorMessage name={name} render={msg =>  (console.log('msg', msg),<div className="error">({msg})</div>)} />
        </div>
    )
}

export default FormInput