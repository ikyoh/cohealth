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
            <div className='flex items-center rounded-full px-4 h-10 text-primary gap-6 w-full md-w-auto bg-slate-100 max-w-sm'>
                <BsSearch size={26} className="text-slate-400" />
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