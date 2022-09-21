import React from 'react'

const Modal = ({ children, handleCloseModal }) => {

    return (
        <div className="fixed md:bg-opacity-50 md:bg-black inset-0 z-50 md:pt-24" onClick={handleCloseModal}>
            <div className="slide w-full md:w-4/6 mx-auto bg-white md:rounded-md p-3 md:p-0">
                {children}
            </div>
        </div>
    )
}

export default Modal