import React from "react";
import Error from "../error/FormError";
import Label from "../label/FormLabel";
import "../style.css";

export const FormSelect = ({
    name,
    label,
    register,
    error,
    required,
    children,
    className,
    onChange,
    disabled = false,
}) => (
    <div className={`form-input ${className ? className : ""}`}>
        <div className="grid grid-cols-2 gap-3">
            <Label name={name} label={label} required={required} />
            {onChange ?
                <select {...register(name)} onChange={onChange} disabled={disabled} >
                    {children}
                </select>
                : <select {...register(name)} disabled={disabled} >
                    {children}
                </select>
            }
        </div>
        <Error error={error} />
    </div>
);
