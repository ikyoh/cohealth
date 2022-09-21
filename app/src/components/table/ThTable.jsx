import React from 'react'
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";

const ThTable = ({ title, sort, handleSort, sortBy, className = null, children }) => {
    return (
        <th className={`cursor-pointer hover:bg-slate-300 ${className && className}`} onClick={() => handleSort(sortBy)}>
            <div className='flex justify-between'>
                <div>
                    {title}
                    {children}
                </div>
                <BsSortDownAlt size={20} className={`${sort.by === sortBy && sort.direction === "asc" ? '' : 'hidden'}`} />
                <BsSortDown size={20} className={`${sort.by === sortBy && sort.direction === "desc" ? '' : 'hidden'}`} />
            </div>
        </th>
    )
}

export default ThTable