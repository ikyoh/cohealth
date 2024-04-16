import React from 'react'
import { BsSortDownAlt, BsSortDown } from "react-icons/bs";
import classNames from 'classnames';

export const Table = ({ children }) => {
    return (
        <table className="table-shadow">
            {children}
        </table>
    )
}

export const Thead = ({ children }) => {
    return (
        <thead className='hidden md:table-header-group'>
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
            <div className='flex justify-between px-3 py-2 h-[60px] items-center z-10 text-slate-600 font-medium uppercase'>
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
            <div className='flex justify-between px-3 py-2 h-[60px] items-center z-10 text-slate-600 font-medium uppercase'>
                <div className="className">
                    {label}
                </div>
            </div>
        </th>
    )

}

export const Tr = ({ onClick, children }) => {

    const ClassNames = classNames("flex flex-col md:table-row border-t border-slate-500/20 md:leading-[1em] relative",
        {
            "hover:bg-slate-50": true,
            "cursor-pointer": onClick ? true : false,
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
                <p>
                    {text}
                </p>
            </div>
        </td>
    )
}
