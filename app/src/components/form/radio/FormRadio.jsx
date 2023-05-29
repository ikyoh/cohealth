import React from 'react';
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import '../style.css'

export const FormRadio = ({ name, label, register, error, required, validationSchema, className, radioDatas }) => (
    <div className={`form-input ${className ? className : ''}`}>
        <div className="grid grid-cols-2 gap-3">
            <Label name={name} label={label} required={required} />
            <div className='flex flex-row gap-5'>
                {radioDatas.map(data =>
                (
                    <div className='flex gap-2' key={data.value}>
                        <input className="radio radio-primary" {...register(name, { required: required })} type="radio" value={data.value} />
                        {data.label}
                    </div>
                )
                )}
            </div>
        </div>
        <Error error={error} />
    </div>
);
