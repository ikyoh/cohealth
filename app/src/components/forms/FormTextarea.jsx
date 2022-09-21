import React from 'react'
import { Field, ErrorMessage } from 'formik';

const FormTextarea = ({ label, name, placeholder, required = false, disabled = false, className = null, rows = 5 }) => {

    return (
        <div className={`bg-gray-100 p-2 rounded ${className ? className : ''}`}>
            <div className="text-sm input-group">
                <div className="text-sm input-group">
                    <label htmlFor={name} className="">
                        {label}
                        {required && <span className='text-red-500'>*</span>}
                    </label>
                    <Field name={name} as='textarea' className="input-group border rounded-sm px-2 w-full" rows={rows} disabled={disabled} placeholder={placeholder} />
                </div>
            </div>
            <ErrorMessage name={name} render={msg => <div className="error">({msg})</div>} />
        </div>
    )
}

export default FormTextarea