import { useState, useCallback } from 'react';
import { BsSearch } from "react-icons/bs";

export const useSearch = (props) => {

    const [searchValue, setSearchvalue] = useState(props ? props : "")

    const setValue = useCallback(function(i) {
        setSearchvalue(i);
    }, []);


    return {
        searchValue,
        setValue,
        searchbar:
            <div className='flex items-center rounded-full border px-4 h-12 text-primary gap-6 w-full md-w-auto bg-white max-w-sm'>
                <BsSearch size={26} className="text-primary" />
                <input
                    value={searchValue}
                    name='search'
                    type="search"
                    placeholder='Recherche'
                    className='appearance-none outline-none focus:outline-none border-none h-12 w-full bg-transparent'
                    onChange={(e) => setSearchvalue(e.target.value)}
                />
            </div >
    }
}