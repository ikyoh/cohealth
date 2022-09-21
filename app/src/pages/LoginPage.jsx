import React, { useEffect } from 'react'
import { Navigate } from "react-router"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAccountStatus, currentAccount } from "../features/account/accountSlice"
import { getAuthenticationStatus, setupToken } from "../features/authentication/authenticationSlice"
import ReactLogo from '../assets/logo-horizontal.svg'
import LoginFrom from '../forms/LoginForm'
import FrontLayout from '../layouts/FrontLayout'


const LoginPage = () => {


    const PageContent = () => {

    const dispatch = useDispatch()
    const authenticationStatus = useSelector(getAuthenticationStatus)
    const accountStatus = useSelector(getAccountStatus)

    useEffect(() => {
        dispatch(setupToken())
    }, [])

    useEffect(() => {
        if (authenticationStatus === "succeeded")
            dispatch(currentAccount())
    }, [authenticationStatus, authenticationStatus])

    if (accountStatus === "succeeded") return (
        <Navigate to="/dashboard" />
    )
    else return (
            <div className="container w-96 p-5">
                <div className='border rounded bg-white p-5'>
                    <div className='flex justify-center my-5 text-xl'>
                        Application CoHealth
                    </div>
                    <div className='h-1 mx-auto bg-info w-3/6 md:w-2/6 mb-6 py-0 rounded-full'></div>
                    <LoginFrom />
                </div>
                <div className='text-center mt-4'>
                    J'ai oublié mon mot de passe.
                </div>
                <div className='text-center mt-4'>
                    <NavLink className="" to='/registration'>
                        Je veux créer un compte.
                    </NavLink>
                </div>
            </div>

 
    )}

    return (
        <FrontLayout>
            <PageContent />
        </FrontLayout>
    )

}

export default LoginPage