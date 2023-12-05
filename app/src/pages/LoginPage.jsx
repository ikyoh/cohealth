import { Navigate } from "react-router"
import { NavLink } from 'react-router-dom'
import { useGetCurrentAccount } from '../queryHooks/useAccount'
import LoginForm from '../forms/LoginForm'
import { useLocation } from 'react-router-dom'

const LoginPage = () => {

    const location = useLocation()

    const { data } = useGetCurrentAccount()

    if (data) return (
        <Navigate to="/dashboard" />
    )
    else
        return (
            <div className="container max-w-xl p-5">
                <div className='border rounded bg-white p-5'>
                    <div className='flex justify-center my-5 text-2xl text-bold'>
                        Application CoHealth
                    </div>
                    <div className='h-1 mx-auto bg-info w-3/6 md:w-2/6 mb-6 py-0 rounded-full'></div>
                    <LoginForm login={location.state && location.state.login ? location.state.login : ""} password={location.state && location.state.password ? location.state.password : ""} />
                </div>
                <div className='text-center mt-4'>
                    <NavLink className="" to='/forgot-password'>
                        J'ai oublié mon mot de passe.
                    </NavLink>
                </div>
                <div className='text-center mt-4'>
                    <NavLink className="" to='/registration'>
                        Je veux créer un compte.
                    </NavLink>
                </div>
            </div>


        )
}

export default LoginPage