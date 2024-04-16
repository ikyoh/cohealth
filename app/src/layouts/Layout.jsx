import React from 'react'
import { useGetCurrentAccount, useLogoutAccount } from '../queryHooks/useAccount';
import PageTitle from '../layouts/PageTitle'
import Menu from '../layouts/Menu'
import { HiLogout } from "react-icons/hi";
import { URL } from '../features/apiConfig';
import * as dayjs from 'dayjs'
import { FaSadTear } from 'react-icons/fa'
import Loader from '../components/Loader';

const Layout = ({ children }) => {

    const { data: account, isLoading, error } = useGetCurrentAccount()
    const { mutate: logout } = useLogoutAccount()

    if (!account) return <Loader />

    else return (
        <div className='md:flex'>
            <Menu />
            <div className='w-full md:flex flex-col bg-slate-100'>
                {/* <div className='hidden md:block bg-slate-100 md:sticky md:top-0 px-10 z-10'>
                    <div className='h-16 md:h-24 flex justify-between items-center border-b'>
                        <div className='text-2xl font-extralight capitalize'>
                            {dayjs().format('dddd D MMMM YYYY')}
                        </div>
                        <div className='flex items-center text-sm space-x-4'>
                            {account.avatar
                                ? <img src={URL + account.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                                : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info'>
                                    {account.firstname && account.firstname.charAt(0)}
                                    {account.lastname && account.lastname.charAt(0)}
                                    {account.organization && account.organization.charAt(0).toUpperCase()}
                                </div>
                            }
                            <p>{account.firstname} {account.lastname} {account.organization}</p>
                        </div>
                    </div>
                </div> */}
                <div className='md:px-10'>
                    {!account.isActive ?
                        <PageTitle title="Compte inactif. Veuillez contacter l'administrateur" icon={<FaSadTear size={40} />} />
                        : <div className='mb-16 md:mb-auto'>{children}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Layout