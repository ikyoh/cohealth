import React from 'react'
import { FormInput } from '../components/form/input/FormInput'

const PasswordFields = ({ name, errors, register }) => {

    return (
        <>
            <FormInput
                type="password"
                name={name ? name + ".password" : "password"}
                label="Mot de passe"
                error={name && errors[name] ? errors[name]['password'] : errors['password']}
                register={register}
                required={true}
            />
            <FormInput
                type="password"
                name={name ? name + ".checkpassword" : "checkpassword"}
                label="Confirmation du mot de passe"
                error={name && errors[name] ? errors[name]['checkpassword'] : errors['checkpassword']}
                register={register}
                required={true}
            />
        </>
    )
}

export default PasswordFields