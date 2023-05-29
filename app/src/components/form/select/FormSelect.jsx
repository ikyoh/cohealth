import React from 'react';
import Error from '../error/FormError'
import Label from '../label/FormLabel'
import '../style.css'

export const FormSelect = ({ name, label, register, error, required, validationSchema, children, className, onChange }) => (
  <div className={`form-input ${className ? className : ''}`}>
    <div className="grid grid-cols-2 gap-3">
      <Label name={name} label={label} required={required} />
      <select
        id={name}
        name={name}
        {...register(name, validationSchema)}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
    <Error error={error} />
  </div>
);
