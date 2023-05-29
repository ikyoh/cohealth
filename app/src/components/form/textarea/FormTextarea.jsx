import React from 'react';
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import '../style.css'

export const FormTextarea = ({ name, label, register, error, required, validationSchema, className, rows = 5 }) => (
    <div className={`form-input ${className ? className : ''}`}>
        <div className="grid grid-cols-1 gap-3">
            <Label name={name} label={label} required={required} />
            <textarea
                name={name}
                {...register(name, validationSchema)}
                rows = {rows}
            />
        </div>
        <Error error={error} />
    </div >
);
