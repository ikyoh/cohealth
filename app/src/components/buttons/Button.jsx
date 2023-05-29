import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import './style.css'

const Button = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className='scaledown rounded-full group bg-action hover:bg-primary h-12 w-12 flex items-center justify-center'>
            {children ? React.cloneElement(children, { size:'36', className: 'text-white group-hover:text-white' })
                : <AiOutlinePlus size={36} className="text-white group-hover:text-white" />
            }
        </button>
    )
}

export default Button