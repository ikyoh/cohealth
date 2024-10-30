import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import './style.css'

const AddButton = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick} className='scaledown rounded-full group bg-action hover:bg-primary h-10 w-10 flex items-center justify-center'>
            <AiOutlinePlus size={32} className="text-white group-hover:text-white" />
        </button>
    )
}

export default AddButton