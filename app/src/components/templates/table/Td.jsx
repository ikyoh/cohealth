import React from 'react'

const Td = ({ label, text, children }) => {
    return (
        <td className='px-3 py-4'>
            <div className='flex items-center'>
                {label ?
                    <span className="inline-block w-5/12 md:hidden text-sm text-indigo-300">
                        {label}
                    </span>
                    : null
                }
                {children}
                {text}
            </div>
        </td>
    )
}

export default Td 