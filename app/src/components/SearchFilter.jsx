import React from 'react'
import { BsSearch } from "react-icons/bs";

const SearchFilter = ({ handleSearch, children }) => {

  return (
    <div className='hidden md:flex items-center rounded-full border px-4 space-x-4' style={{height:52}}>
      <BsSearch size={26} />
      <input
        type="text"
        placeholder='recherche'
        className='appearance-none outline-none bg-transparent'
        onChange={handleSearch}
      />
      {children &&
        <div className='border-l pl-2 flex items-center space-x-4'>
          {children}
        </div>
      }
    </div>
  )
}

export default SearchFilter