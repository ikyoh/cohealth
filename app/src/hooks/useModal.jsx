import { useState } from 'react';
import { MdClose } from "react-icons/md";
import classNames from 'classnames';


export const useModal = () => {

    const [modal, setModal] = useState({
        title: '',
        show: false,
        content: false,
        size: "medium"
    })

    const handleOpenModal = (event) => {
        setModal({ ...modal, show: true, title: event.title, content: event.content, size: event.size || 'medium' })
    }

    const handleCloseModal = () => {
        setModal({ ...modal, show: false })
    }

    const modalClassName = classNames({
        "modal": true,
        "modal-open": modal.show
    });

    const boxClassName = classNames({
        "modal-box rounded-md p-0 bg-white w-11/12 transition-all": true,
        "max-w-4xl": modal.size==="medium",
        "max-w-screen-2xl": modal.size==="full",
    });


    const Modal = () => {
        return (
            <div className={modalClassName}>
                <div className={boxClassName}>
                    <div className="text-primary p-2 md:py-4 md:px-5 text-xl border-b bg-white">
                        {modal.title}
                        <button onClick={handleCloseModal} className="absolute right-3 top-2 text-primary p-2 text-3xl font-thin transition ease-in-out active:scale-[0.9] duration-100">
                            <MdClose />
                        </button>
                    </div>
                    <div className='overflow-y-scroll max-h-[calc(100vh-160px)]'>
                        {modal.content}
                    </div>
                </div>
            </div>
        )
    }

    return {
        Modal,
        handleOpenModal,
        handleCloseModal,
    }
}