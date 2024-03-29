import React from 'react'
import { BsSortDownAlt, BsSortDown } from "react-icons/bs";
import classNames from 'classnames';

const Th = ({ label, sortBy, sortValue, sortDirection, handleSort}) => {

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

export default Th