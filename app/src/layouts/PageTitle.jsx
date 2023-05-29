import React from 'react'

const PageTitle = ({ title, children, icon = false }) => {
    return (
        <div className='px-3 md:px-0 flex flex-col md:flex-row justify-between mb-3 h-20'>
            <div className='flex items-center gap-3'>
                <div>{icon}</div>
                <div className='font-medium text-xl md:text-2xl flex items-center'>
                    {title}
                </div>
            </div>
            <div className='flex items-center justify-between'>
                {children}
            </div>
        </div>

    )
}

export default PageTitle