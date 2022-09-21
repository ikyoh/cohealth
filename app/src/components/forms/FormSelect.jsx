import React from 'react'
import { Field, ErrorMessage } from 'formik';

const FormSelect = ({ label, name, children, multiple = false, required = false, disabled = false, className = null }) => {

    return (
        <div className={`bg-gray-100 p-2 rounded ${className ? className : ''}`}>
            <div className="md:flex md:justify-between md:items-center text-sm input-group">
                <label htmlFor={name} className="">
                    {label}
                    {required && <span className='text-red-500'>*</span>}

                </label>
                <Field
                    multiple={multiple}
                    name={name}
                    as="select"
                    disabled={disabled}
                >
                    {children}
                </Field>
            </div>
            <ErrorMessage name={name} render={msg => <div className="error">({msg})</div>} />
        </div>
    )
}

export default FormSelect

