import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { useSelector } from "react-redux"
import { API_URL } from '../../features/apiConfig'
import { getAccount } from '../../features/account/accountSlice'

const FormComment = ({ label, name, required = false, disabled = false, className = null }) => {


    const account = useSelector(getAccount)

    return (
        <div className={`bg-gray-100 p-2 rounded text-sm input-group ${className ? className : ''}`}>
            <div className='flex items-center gap-3'>
                {account && account.avatar
                    ? <img src={API_URL + account.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info'>
                        {account.firstname.charAt(0)}
                        {account.lastname.charAt(0)}
                    </div>
                }
                Commentaire personnel</div>
            <div className="text-sm input-group">
                <label htmlFor={name} className="">
                    {label}
                    {required && <span className='text-red-500'>*</span>}
                </label>
                <Field name={name} as='textarea' className="input-group border rounded-sm px-2 w-full" rows='5' disabled={disabled} />
            </div>

        </div>
    )
}

export default FormComment