import React from 'react'
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import '../style.css'

export const FormMaskInput = ({ name, mask, maskChar = null, label, register, error, required, type, placeholder, validationSchema, className, control }) => (
    <div className={`form-input ${className ? className : ''}`}>
        <div className="md:grid md:grid-cols-2 gap-3">
            <Label name={name} label={label} required={required} /> 
            <Controller
                control={control}
                name={name}
                render={({ field, ref }) => (
                    <InputMask
                        type="text"
                        {...field}
                        mask={mask}
                        maskChar={maskChar}
                        ref={ref}
                    />
                )}
            />
        </div>
        <Error error={error} />
    </div >
);