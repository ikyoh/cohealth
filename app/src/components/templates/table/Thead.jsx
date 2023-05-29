import React from 'react'

const Thead = ({ children }) => {
    return (
        <thead className='bg-slate-200 sticky top-24'>
            <tr>
            {children}
            </tr>
        </thead>
    )
}

export default Thead