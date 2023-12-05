import React from 'react'
import { BsSortDownAlt, BsSortDown } from "react-icons/bs";
import classNames from 'classnames';

export const Table = ({ children }) => {
    return (
        <table className="w-full table-fixed text-left border-collapse bg-white text-sm">
            {children}
        </table>
    )
}

export const Thead = ({ children }) => {
    return (
        <thead className='bg-slate-200 sticky top-24 z-10 hidden md:table-header-group'>
            <tr>
                {children}
            </tr>
        </thead>
    )
}

export const Tbody = ({ children }) => {
    return (
        <tbody className='h-full'>
            {children}
        </tbody>
    )
}

export const Th = ({ label, sortBy, sortValue, sortDirection, handleSort }) => {

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
                <div className="className">
                    {label}
                </div>
            </div>
        </th>
    )

}

export const Tr = ({ onClick = false, children }) => {

    const ClassNames = classNames("flex flex-col md:table-row border-t border-slate-500/20 md:leading-[1em] even:bg-slate-100 md:even:bg-white relative",
        {
            "hover:bg-slate-50 cursor-pointer": true,
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
        <td className='px-3 pb-1 md:py-4 first:pt-5 md:first:pt-auto'>
            <div className='flex flex-wrap flex-col md:flex-row md:items-center'>
                {label ?
                    <div className="block md:hidden text-sm text-primary/50">
                        {label}
                    </div>
                    : null
                }
                {children}
                <p className='first-letter:uppercase'>
                    {text}
                </p>
            </div>
        </td>
    )
}
