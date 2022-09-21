import React, { useState } from 'react'
import PartnersContainer from '../../features/partners/PartnersContainer'
import SearchFilter from '../SearchFilter'
import { AiFillPlusCircle } from "react-icons/ai"


const FormSelectPartnerIRI = ({ name = false, setField, setAction, value }) => {

    const removeItem = (id) => {
        console.log('id', id)
        let newArray = value.filter((f) => f.id !== id)
        setField('coworkersDetailed', newArray)
    }

    const [search, setSearch] = useState('')

    const Partner = ({ item }) => {

        if (value.filter(f => f.id === item.id).length === 0)
            return (
                <div className="border-b px-3 py-2 flex justify-between bg-gray-200 cursor-pointer"
                    onClick={() => setField('coworkersDetailed', [...value, item])}
                >
                    <div>{item.lastname.toUpperCase() + " " + item.firstname} </div>
                    <div>RCC : {item.rcc}</div>

                </div>
            )
        else return (
            <div className="border-b px-3 py-2 flex justify-between bg-action cursor-pointer"
                onClick={() => removeItem(item.id)}
            >
                <div>{item.lastname.toUpperCase() + " " + item.firstname} </div>
                <div>RCC : {item.rcc}</div>

            </div>
        )
    }

return (
    <>
        <div className='-top-5 py-3 sticky bg-white flex justify-between border-b'>
            <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)} />
        </div>
        <PartnersContainer search={search}>
            <Partner />
        </PartnersContainer>
    </>
)
}

export default FormSelectPartnerIRI