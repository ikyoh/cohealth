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
            <div className='md:flex items-center rounded-full border px-4 h-12 text-primary gap-6 mr-6' >
                <BsSearch size={26} className="text-primary" />
                <input
                    value={searchValue}
                    name='search'
                    type="search"
                    placeholder='Recherche'
                    className='appearance-none outline-none focus:outline-none bg-transparent border-none h-12 w-full'
                    onChange={(e) => setSearchvalue(e.target.value)}
                />
            </div >
    }
}