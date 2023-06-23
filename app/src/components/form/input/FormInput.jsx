import React from 'react';
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import '../style.css'

export const FormInput = ({ name, label, register, error, required, type, placeholder, validationSchema, className }) => (
  <div className={`form-input ${className ? className : ''}`}>
    <div className="grid grid-rows-1 md:grid-cols-2 gap-3">
      <Label name={name} label={label} required={required} />
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validationSchema)}
      />
    </div>
    <Error error={error} />
  </div >
);
