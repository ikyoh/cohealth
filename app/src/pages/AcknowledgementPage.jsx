import React from 'react'
import RegistrationForm from '../forms/RegistrationForm'

const AcknowledgementPage = () => {

    return (
        <div className='container max-w-6xl'>
            <h1 className="text-center text-2xl font-bold">
                Votre compte vient d'être créé.
            </h1>
            <p className="text-center">
                Après validation par un administrateur votre compte sera activé.
            </p>
        </div>
    )

}

export default AcknowledgementPage