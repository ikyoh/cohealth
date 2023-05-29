import React from 'react';
import Error from '../error/FormError'
import '../style.css'

export const FormFile = ({ name, register, error, validationSchema, className }) => (
  <div className={`form-input ${className ? className : ''}`}>
      <input
        id={name}
        name={name}
        type="file"
        {...register(name, validationSchema)}
      />
    <Error error={error} />
  </div >
);
