import React from 'react'
import classNames from 'classnames'

const Tr = ({ onClick, children }) => {

    const ClassNames = classNames("flex flex-col md:table-row border-t border-slate-500/20 leading-8 md:leading-[1em]",
        {
            "hover:bg-light dark:hover:bg-dark cursor-pointer modal-open": onClick,
        })

    return (
        <tr
            onClick={onClick}
            className={ClassNames}
        >
            {children}
        </tr>
    )
}

export default Tr