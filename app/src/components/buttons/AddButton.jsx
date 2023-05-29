import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import './style.css'

const AddButton = ({onClick}) => {
    return (
        <button onClick={onClick} className='scaledown rounded-full group bg-action hover:bg-primary h-12 w-12 flex items-center justify-center'>
            <AiOutlinePlus size={36} className="text-white group-hover:text-white" />
        </button>
    )
}

export default AddButton