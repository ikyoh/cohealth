import React from 'react'
import { BsSortDownAlt, BsSortDown } from "react-icons/bs";
import classNames from 'classnames';

export const Table = ({ children }) => {
    return (
        <div className='h-full'>
            <table className="w-full table-fixed text-left border-collapse bg-white text-sm">
                {children}
            </table>
        </div>
    )
}

export const Thead = ({ children }) => {
    return (
        <thead className='bg-slate-200 sticky top-24'>
            <tr>
            {children}
            </tr>
        </thead>
    )
}

export const Tbody = ({ children }) => {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

export const Th = ({ label, sortBy, sortValue, sortDirection, handleSort}) => {

    const className = classNames("leading-10 p-0 font-normal",
        {
            "w-28": label === "#",
            "w-12": label === "",
            "cursor-pointer": sortBy,
            "cursor-no-drop": !sortBy,
        }
    )

    if (sortBy) return (
        <th
            className={className}
            onClick={() => handleSort(sortBy)}
        >
            <div className='flex justify-between px-3 py-2 border-b border-slate-200 h-[60px] items-center z-10'>
                <div className="">
                    {label}
                </div>
                {sortBy === sortValue && sortDirection === 'asc' &&
                    <BsSortDownAlt size={20} />
                }
                {sortBy === sortValue && sortDirection === 'desc' &&
                    <BsSortDown size={20} />
                }
            </div>
        </th>
    )

    else return (
        <th
            className={className}
        >
            <div className='px-2 py-2 border-b border-slate-200 h-[60px] items-center'>
                <div className="">
                    {label}
                </div>
            </div>
        </th>
    )

}

export const Tr = ({ onClick, children }) => {

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

export const Td = ({ label, text, children }) => {
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
