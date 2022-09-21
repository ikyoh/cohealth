import React, { useState } from 'react'
import Modal from '../components/modals/Modal';
import ModalTitle from '../components/modals/ModalTitle';
import ModalBody from '../components/modals/ModalBody';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import ReactLogo from '../assets/logo-horizontal.svg'
import ModalsMentions from '../modals/ModalsMentions';

const FrontLayout = ({ children }) => {

    const location = useLocation();

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

            <div className="overflow-y-scroll flex flex-col place-content-between h-screen bg-gradient-to-b from-action via-white to-white">
                <div className='flex-none bg-white sticky top-0'>
                    <div className='container h-20 flex items-center justify-between px-3 md:px-O xl:px-32'>
                        <NavLink className="" to='/'>
                            <img src={ReactLogo} alt="React Logo" style={{ width: 150 }} />
                        </NavLink>
                        <nav>
                            {location.pathname === "/login" ?
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
                    {React.cloneElement(children, { handleCloseModal, handleOpenModal })}
                </div>

                <div className="flex-none container md:max-w-4xl py-12 flex flex-col gap-3 md:flex-row justify-between">
                    <div className='self-center mb-5 mb:mb-0'>
                        <img src={ReactLogo} alt="React Logo" style={{ width: 180 }} />
                    </div>

                    <ul className='flex flex-col gap-3 px-[calc(100%/4)] md:px-0'>
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

                    <ul className='flex flex-col gap-3 px-[calc(100%/4)] md:px-0'>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Mentions légales', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Mentions légales
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Conditions générales de vente', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            CGV
                        </li>
                        <li className='cursor-pointer'
                            onClick={() => handleOpenModal({ title: 'Confidentialité', content: <ModalsMentions handleCloseModal={handleCloseModal} /> })}>
                            Confidentialité
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-3 px-[calc(100%/4)] md:px-0'>
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