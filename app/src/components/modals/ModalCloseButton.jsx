import React from 'react'
import { MdClose } from "react-icons/md";

function ModalCloseButton({ handleCloseModal }) {
    return (
        <button
            className=" text-primary p-2 text-3xl font-thin"
            onClick={handleCloseModal}
        >
            <MdClose />
        </button>
    )
}

export default ModalCloseButton
