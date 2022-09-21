import React from 'react'
import { Field, ErrorMessage } from 'formik';

const FormCheckbox = ({ label, name, required = false, disabled = false, className = null }) => {

    return (
        <div className='p-2'>
            <div className={`md:flex gap-5 md:items-center text-sm input-group ${className ? className : ''}`}>
                <Field type="checkbox" name={name} />
                <label htmlFor={name} className="">
                    {label}
                    {required && <span className='text-red-500'>*</span>}
                </label>
            </div>
            <ErrorMessage name={name} render={msg => <div className="error">({msg})</div>} />
        </div>
    )
}

export default FormCheckbox