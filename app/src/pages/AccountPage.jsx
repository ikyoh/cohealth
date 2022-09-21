import React from 'react'
import AccountForm from '../forms/AccountForm'
import AccountMediaForm from '../forms/AccountMediaForm'
import Layout from '../layouts/Layout'
import PageTitle from '../layouts/PageTitle'
import { API_URL } from '../features/apiConfig';
import { useSelector } from "react-redux"
import { getAccount } from "../features/account/accountSlice"
import { MdOutlineSettings } from "react-icons/md"

const AccountPage = () => {

    const PageContent = ({ handleOpenModal, handleCloseModal }) => {

        const account = useSelector(getAccount)

        return (
            <>
                <PageTitle title="Mon compte" icon={<MdOutlineSettings size={40} />} />
                <div className='bg-white p-5'>
                    <div className='flex justify-center mb-5'>
                        <div className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Mon portrait', content: <AccountMediaForm type="avatar" handleCloseModal={handleCloseModal} /> })}>
                            {account && account.avatar
                                ? <img src={API_URL + account.avatar.contentUrl} className='rounded-full object-cover h-14 w-14' alt="profil" />
                                : <div className='rounded-full flex items-center justify-center h-14 w-14 bg-info'>
                                    {account.firstname.charAt(0)}
                                    {account.lastname.charAt(0)}
                                </div>
                            }
                        </div>
                    </div>

                    <AccountForm></AccountForm>

                    <div className='flex justify-center mt-5'>
                        <div className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Ma signature', content: <AccountMediaForm type="signature" handleCloseModal={handleCloseModal} /> })}>
                            {account && account.signature
                                ? <img src={API_URL + account.signature.contentUrl} className='object-cover max-w-xs' alt="profil" />
                                : <div className='flex items-center justify-center rounded-full px-3 py-2 bg-action'>
                                   Ma signature
                                </div>
                            }
                        </div>
                    </div>

                </div>

            </>
        )
    }

    return (
        <Layout>
            <PageContent />
        </Layout>
    )
}

export default AccountPage