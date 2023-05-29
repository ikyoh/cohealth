import { useState, useEffect } from 'react';

export const useSortBy = ({value, direction}) => {

    const handleSort = newValue => {
        setPreviousValue(sortValue)
        setValue(newValue)
        setUpdateHook(!updateHook)
    }

    const [updateHook, setUpdateHook] = useState(false)

    const [sortValue, setValue] = useState(value ? value : 'id')

    const [sortDirection, setDirection] = useState(direction ? direction : 'desc')

    const [previousValue, setPreviousValue] = useState('desc')

    useEffect(() => {
        if (sortValue === previousValue) setDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    }, [updateHook])

    return {
        handleSort,
        sortValue,
        sortDirection
    }
}