import React from 'react'
import FrontLayout from '../layouts/FrontLayout'
import RegistrationForm from '../forms/RegistrationForm'

const RegistrationPage = () => {

    const PageContent = () => {

        return (
            <>
                <div className="container max-w-4xl p-5 ">
                    <div className='border rounded bg-white p-5'>
                        <div className='flex justify-center my-5 text-xl'>
                            Formulaire d'inscription
                        </div>
                        <div className='h-1 mx-auto bg-info w-3/6 md:w-2/6 mb-6 py-0 rounded-full'></div>
                        <RegistrationForm />
                    </div>
                </div>
            </>
        )

    }

    return (
        <FrontLayout>
            <PageContent />
        </FrontLayout>
    )

}

export default RegistrationPage