import React, { useState } from 'react'
import Modal from '../components/modals/Modal';
import ModalTitle from '../components/modals/ModalTitle';
import ModalBody from '../components/modals/ModalBody';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import ReactLogo from '../assets/logo-horizontal.svg'
import ModalsMentions from '../modals/ModalsMentions';
import { useModal } from '../hooks/useModal'

const FrontLayout = ({ children }) => {

    const location = useLocation()
    const { Modal, handleOpenModal, handleCloseModal } = useModal()

    return (
        <>
            <Modal />
            <div className="flex flex-col place-content-between h-screen bg-gradient-to-b from-action via-white to-white">
                <div className='flex-none bg-white sticky top-0 z-50'>
                    <div className='container h-20 flex items-center justify-between px-3 md:px-O xl:px-32'>
                        <NavLink className="" to='/'>
                            <img src={ReactLogo} alt="React Logo" style={{ width: 150 }} />
                        </NavLink>
                        <nav>
                            {location.pathname === "/login"
                                ?
                                <NavLink className="" to='/registration'>
                                    <button className="button-submit flex justify-center h-10 items-center w-36">
                                        Je m'inscrit !
                                    </button>
                                </NavLink>
                                :
                                <NavLink className="" to='/login'>
                                    <button className="button-submit flex justify-center h-10 items-center w-36">
                                        Connexion
                                    </button>
                                </NavLink>
                            }
                        </nav>
                    </div>
                </div>

                <div className='flex-grow md:mt-24'>
                    {children}
                </div>

                <div className="flex-none container md:max-w-4xl py-12 flex flex-col gap-3 md:flex-row justify-between">
                    <div className='self-center mb-5 mb:mb-0'>
                        <img src={ReactLogo} alt="React Logo" style={{ width: 180 }} />
                    </div>

                    <ul className='flex flex-col gap-3 md:px-0 text-center md:text-left'>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Foires aux questions', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            FAQ
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Mentions légales', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Aide
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Support technique', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Support technique
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-3 md:px-0 text-center md:text-left'>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Mentions légales', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Mentions légales
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Conditions générales de vente', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            GDPR
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Confidentialité', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Confidentialité
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-3 md:px-0 text-center md:text-left'>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'A propos', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            A propos
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Contact', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Contact
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default FrontLayout