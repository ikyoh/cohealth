import React from 'react'
import RegistrationForm from '../forms/RegistrationForm'

const RegistrationPage = () => {

        return (
            <>
                <div className="container max-w-4xl p-5 ">
                    <div className='border rounded bg-white p-5'>
                        <div className='flex justify-center my-5 text-2xl text-bold'>
                            Je m'inscris
                        </div>
                        <div className='h-1 mx-auto bg-info w-3/6 md:w-2/6 mb-6 py-0 rounded-full'></div>
                        <RegistrationForm />
                    </div>
                </div>
            </>
        )

    }

export default RegistrationPage