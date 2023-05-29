import React from 'react';
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import '../style.css'

export const FormCheckbox = ({ name, label, register, error, required, type, placeholder, validationSchema, className }) => (
    <div className={`form-input ${className ? className : ''}`}>
        <div className="flex gap-3">
            <input
                id={name}
                name={name}
                type='checkbox'
                {...register(name, validationSchema)}
            />
            <Label name={name} label={label} required={required} />
        </div>
        <Error error={error} />
    </div >
);