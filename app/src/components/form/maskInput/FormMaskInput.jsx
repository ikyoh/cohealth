import React from 'react'
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';
import '../style.css'

export const FormMaskInput = ({ name, mask, label, register, error, required, type, placeholder, validationSchema, className, control }) => (
    <div className={`form-input ${className ? className : ''}`}>
        <div className="md:grid md:grid-cols-2 gap-3">
            <Label name={name} label={label} required={required} />

            {/* <InputMask
                id={name}
                type="text"
                mask={mask}
                maskChar={null}
                defaultValue="R1111.43"
                {...register(name, validationSchema)}
            /> */}


            <Controller
                control={control}
                name={name}
                //defaultValue="123-456-7890"
                render={({ field }) => (
                    <InputMask
                        type="text"
                        {...field}
                        mask={mask}
                        maskChar="_"
                    />
                )}
            />


            {/* <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                {...register(name, validationSchema)}
            /> */}
        </div>
        <Error error={error} />
    </div >
);