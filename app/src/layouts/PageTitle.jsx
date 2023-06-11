import React from 'react'

const PageTitle = ({ title, subtitle, children, icon = false }) => {
    return (
        <div className='px-3 md:px-0 flex flex-col md:flex-row justify-between mb-3 h-20'>
            <div className='flex items-center gap-3'>
                <div>{icon}</div>
                <div className='font-medium text-xl md:text-2x'>
                    {title}
                    {subtitle &&
                        <span className='font-light text-base ml-3'>
                            {subtitle}
                        </span>
                    }
                </div>
            </div>
            <div className='flex items-center justify-between'>
                {children}
            </div>
        </div>

    )
}

export default PageTitle