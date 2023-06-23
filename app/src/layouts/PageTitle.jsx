import React from 'react'

const PageTitle = ({ title, subtitle, children, icon = false, mainButton }) => {
    return (
        <div className='p-3 md:p-0 flex md:h-20 flex-wrap gap-3'>
            <div className='flex items-center gap-3 grow'>
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
            <div className='w-full md:w-auto flex items-center justify-end gap-3 order-last md:order-2 grow'>
                {children}
            </div>
            {mainButton &&
                <div className='flex items-center justify-between grow-0 order-3 md:order-last'>
                    {mainButton}
                </div>
            }
        </div>

    )
}

export default PageTitle