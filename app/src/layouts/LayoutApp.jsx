import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout, getAccount } from "../features/account/accountSlice";
import Menu from './Menu'
import dayjs from 'dayjs'
import Modal from '../components/modals/Modal';
import ModalTitle from '../components/modals/ModalTitle';
import ModalBody from '../components/modals/ModalBody';
import { HiLogout } from "react-icons/hi";
import { API_URL } from '../features/apiConfig';
import * as dayjs from 'dayjs'


const LayoutApp = ({ children }) => {

    dayjs.locale('fr')

    const dispatch = useDispatch()
    const account = useSelector(getAccount)

    const [modal, setModal] = useState({
        title: '',
        show: false,
        content: false
    })


    const handleOpenModal = (event) => {
        setModal({ ...modal, show: true, title: event.title, content: event.content })
    }

    const handleCloseModal = (e) => {
        setModal({ ...modal, show: false })
    }

    const RenderModal = () => {

        if (!modal.show) return null
        else return (
            <Modal>
                <ModalTitle title={modal.title} handleCloseModal={handleCloseModal} />
                <ModalBody>
                    {modal.content}
                </ModalBody>
            </Modal>
        )
    }

    return (
        <>
            <RenderModal />
            <div className='h-screen flex flex-col md:flex-row'>
                <Menu />
                <div className='w-full md:flex-1 md:overflow-y-scroll overflow-none md:relative absolute mt-16 md:mt-0'>
                    <div className='bg-slate-100 md:sticky md:top-0 mx-10'>
                        <div className='h-16 md:h-24 flex justify-between items-center border-b'>
                            <div className='text-2xl font-extralight capitalize'>
                                {dayjs().format('dddd D MMMM YYYY')}
                            </div>
                            <div className='flex items-center text-sm space-x-4'>
                                {account && account.avatar
                                    ? <img src={API_URL + account.avatar.contentUrl} className='rounded-full object-cover h-10 w-10' alt="profil" />
                                    : <div className='rounded-full flex items-center h-10 justify-center w-10 bg-info'>
                                        {account.firstname.charAt(0)}
                                        {account.lastname.charAt(0)}
                                    </div>
                                }
                                <p>{account.firstname} {account.lastname}</p>
                                <HiLogout size="20" className='cursor-pointer' onClick={() => dispatch(logout())} />
                            </div>
                        </div>
                    </div>
                    <div className='bg-slate-100 p-3 pt-5 md:px-10'>
                        {React.cloneElement(children, { handleCloseModal, handleOpenModal })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutApp