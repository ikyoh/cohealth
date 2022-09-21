import React, { useState } from 'react'
import AssurancesContainer from '../../features/assurances/AssurancesContainer'
import SearchFilter from '../SearchFilter'
import { AiFillPlusCircle } from "react-icons/ai"
import { ErrorMessage } from 'formik'

const FormSelectAssuranceIRI = ({ name = false, setField, value }) => {

    const [search, setSearch] = useState('')

    const Assurance = ({ item }) => {
        return (
            <div className={`border-b px-3 py-2 flex justify-between ${value === item.id ? 'bg-action' : 'hover:bg-slate-200 cursor-pointer'}`}
                onClick={() => setField('assuranceIRI', item.id)}
            >
                <div>{item.company} <span className='pl-3 text-slate-400'>{item.type}</span></div>
                {item.gln &&
                    <div>GLN : {item.gln}</div>
                }
            </div>
        )
    }

    return (
        <>
           <div className='-top-5 py-3 sticky bg-white flex justify-between gap-3 items-center border-b'>
                <SearchFilter value={search} handleSearch={({ currentTarget }) => setSearch(currentTarget.value)} />
                <ErrorMessage name='assuranceIRI' render={msg => <div className="error">({msg})</div>} />
            </div>
            <div className="mt-3">
            <AssurancesContainer search={search}>
                <Assurance />
            </AssurancesContainer>
            </div>
        </>
    )
}

export default FormSelectAssuranceIRI